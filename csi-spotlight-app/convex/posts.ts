import { mutation, MutationCtx, query } from "@/convex/_generated/server"
import { v }                            from "convex/values"
import { getAuthUser }                  from "@/convex/users"

export const generateUploadUrl = mutation( {
  handler: async ( ctx ) => {
    const identity = await ctx.auth.getUserIdentity()

    if ( !identity ) {
      throw new Error( "Not authenticated" )
    }
    return await ctx.storage.generateUploadUrl()
  }
} )

export const createPost = mutation( {
  args   : {
    storageId: v.id( "_storage" ),
    caption  : v.string()
  },
  handler: async ( ctx, args ) => {
    const user     = await getAuthUser( ctx )
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
    const user  = await getAuthUser( ctx )
    const posts = await ctx.db.query( "posts" )
                           .order( "desc" )
                           .collect()

    if ( !posts ) {
      return []
    }

    return await Promise.all( posts.map( async ( post ) => {
      const postAuthor = await ctx.db.get( post.userId )
      const like       = await ctx.db.query( "likes" )
                                  .withIndex( "by_user_and_post",
                                    q => q.eq( "userId", user._id )
                                          .eq( "postId", post._id ) ).first()

      const bookmark = await ctx.db.query( "bookmarks" )
                                .withIndex( "by_user_and_post",
                                  q => q.eq( "userId", user._id )
                                        .eq( "postId", post._id ) ).first()

      return {
        ...post,
        author      : {
          _id     : postAuthor._id,
          username: postAuthor.username,
          image   : postAuthor.image
        },
        isLiked     : Boolean( like ),
        isBookmarked: Boolean( bookmark )
      }
    } ) )
  }
} )

export const toggleLike = mutation( {
  args   : {
    postId: v.id( "posts" )
  },
  handler: async ( ctx, args ) => {
    const user = await getAuthUser( ctx )
    const like = await ctx.db.query( "likes" )
                          .withIndex( "by_user_and_post",
                            q => q.eq( "userId", user._id )
                                  .eq( "postId", args.postId ) ).first()

    const post = await ctx.db.get( args.postId )
    if ( !post ) {
      throw new Error( "Post not found" )
    }

    if ( like ) {
      await ctx.db.delete( like._id )
      await ctx.db.patch( post._id, {
        likes: post.likes - 1
      } )
      return false
    }
    await ctx.db.insert( "likes", {
      userId: user._id,
      postId: args.postId
    } )
    await ctx.db.patch( post._id, {
      likes: post.likes + 1
    } )

    if ( user._id !== post.userId ) {
      await ctx.db.insert( "notifications", {
        receiverId: post.userId,
        senderId  : user._id,
        type      : "like",
        postId    : post._id
      } )
    }

    return true
  }
} )

export const deletePost = mutation( {
  args   : {
    postId: v.id( "posts" )
  },
  handler: async ( ctx, args ) => {
    const user = await getAuthUser( ctx )
    const post = await ctx.db.get( args.postId )
    if ( !post ) {
      throw new Error( "Post not found" )
    }
    if ( post.userId !== user._id ) {
      throw new Error( "Not authorized" )
    }

    const likes = await ctx.db.query( "likes" )
                           .withIndex( "by_post",
                             q => q.eq( "postId", post._id ) )
                           .collect()

    for ( const like of likes ) {
      await ctx.db.delete( like._id )
    }

    const comments = await ctx.db.query( "comments" )
                              .withIndex( "by_post",
                                q => q.eq( "postId", post._id ) )
                              .collect()

    for ( const comment of comments ) {
      await ctx.db.delete( comment._id )
    }

    const notifications = await ctx.db.query( "notifications" )
                                   .withIndex( "by_post",
                                     q => q.eq( "postId", post._id ) )
                                   .collect()

    for ( const notification of notifications ) {
      await ctx.db.delete( notification._id )
    }

    const bookmarks = await ctx.db.query( "bookmarks" )
                               .withIndex( "by_post",
                                 q => q.eq( "postId", post._id ) )
                               .collect()

    for ( const bookmark of bookmarks ) {
      await ctx.db.delete( bookmark._id )
    }

    await ctx.storage.delete( post.storageId )
    await ctx.db.delete( post._id )

    await ctx.db.patch( user._id, {
      posts: Math.max( 0, (
        user.posts || 1
      ) - 1 )
    } )
  }
} )

export const getPostById = query( {
  args   : {
    userId: v.optional( v.id( "users" ) )
  },
  handler: async ( ctx, args ) => {
    const user = await args.userId
      ? await ctx.db.get( args.userId )
      : await getAuthUser( ctx )
    if ( !user ) {
      throw new Error( "Post not found" )
    }
    const posts = await ctx.db.query( "posts" )
                           .withIndex( "by_user",
                             q => q.eq( "userId", user._id ) )
                           .collect()
    return posts
  }
} )
