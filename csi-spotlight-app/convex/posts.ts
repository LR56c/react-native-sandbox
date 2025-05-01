import { mutation, query } from "@/convex/_generated/server"
import { v }               from "convex/values"
import { getAuthUser }     from "@/convex/users"

export const generateUploadUrl = mutation( {
  handler: async ( ctx ) => {
    const identity = await ctx.auth.getUserIdentity()

    if ( !identity ) {
      throw new Error( "Not authenticated" )
    }
    return await ctx.storage.generateUploadUrl()
  }
} )
export const createPost        = mutation( {
  args   : {
    storageId: v.id( "_storage" ),
    caption  : v.string()
  },
  handler: async ( ctx, args ) => {
    const user = await getAuthUser(ctx)
    const imageUrl = await ctx.storage.getUrl( args.storageId )
    if ( !imageUrl ) {
      throw new Error( "Image not found" )
    }

    const post = await ctx.db.insert( "posts", {
      userId   : user._id,
      imageUrl : imageUrl,
      storageId: args.storageId,
      caption  : args.caption,
      likes    : 0,
      comments : 0
    } )
    await ctx.db.patch( user._id, {
      posts: user.posts + 1
    } )
    return post
  }
} )

export const getFeedPosts = query( {
  handler: async ( ctx ) => {
    const user = await getAuthUser( ctx )
    return await ctx.db.query( "posts" )
                    .withIndex( "by_user", ( q ) => q.eq( "userId", user._id ) )
                    .collect()
  }
} )
