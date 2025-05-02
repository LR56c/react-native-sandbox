import { mutation, query } from "@/convex/_generated/server"
import { v }               from "convex/values"
import { getAuthUser }     from "@/convex/users"

export const addComment = mutation( {
  args   : {
    postId : v.id( "posts" ),
    content: v.string()
  },
  handler: async ( ctx, args ) => {
    const user = await getAuthUser( ctx )
    if ( !user ) {
      throw new Error( "Not authenticated" )
    }

    const post = await ctx.db.get( args.postId )
    if ( !post ) {
      throw new Error( "Post not found" )
    }

    const comment = await ctx.db.insert( "comments", {
      userId : user._id,
      postId : args.postId,
      content: args.content
    } )
    await ctx.db.patch( args.postId, {
      comments: post.comments + 1
    } )

    if ( post.userId !== user._id ) {
      await ctx.db.insert( "notifications", {
        receiverId: post.userId,
        senderId  : user._id,
        type      : "comment",
        postId    : args.postId,
        commentId : comment
      } )
    }
    return comment
  }
} )

export const getComments = query( {
  args   : {
    postId: v.id( "posts" )
  },
  handler: async ( ctx, args ) => {
    const comments = await ctx.db.query( "comments" )
                              .withIndex( "by_post",
                                q => q.eq( "postId", args.postId ) )
                              .collect()

    const commentsWithInfo = await Promise.all(
      comments.map( async ( comment ) => {
        const user = await ctx.db.get( comment.userId )
        return {
          ...comment,
          user: {
            fullname: user!.fullname,
            image   : user!.image
          }
        }
      } ) )
    return commentsWithInfo
  }
} )
