import { mutation, query } from "@/convex/_generated/server"
import { v }               from "convex/values"
import { getAuthUser }     from "@/convex/users"

export const toggleBookmark = mutation( {
  args   : {
    postId: v.id( "posts" )
  },
  handler: async ( ctx, args ) => {
    const user = await getAuthUser( ctx )
    if ( !user ) {
      throw new Error( "Not authenticated" )
    }

    const bookmark = await ctx.db
                              .query( "bookmarks" )
                              .withIndex( "by_user_and_post", ( q ) =>
                                q.eq( "userId", user._id )
                                 .eq( "postId", args.postId )
                              )
                              .first()

    if ( bookmark ) {
      await ctx.db.delete( bookmark._id )
      return false
    }
    else {
      await ctx.db.insert( "bookmarks", {
        userId: user._id,
        postId: args.postId
      } )
      return true
    }
  }
} )

export const getBookmarkedPosts = query( {
  handler: async ( ctx, args ) => {
    const user = await getAuthUser( ctx )

    const bookmarks = await ctx.db
                               .query( "bookmarks" )
                               .withIndex( "by_user",
                                 ( q ) => q.eq( "userId", user._id ) )
                               .order( "desc" )
                               .collect()

    const bookmarksWithInfo = await Promise.all(
      bookmarks.map( async ( bookmark ) => {
        return await ctx.db.get( bookmark.postId )
      } )
    )

    return bookmarksWithInfo
  }
} )
