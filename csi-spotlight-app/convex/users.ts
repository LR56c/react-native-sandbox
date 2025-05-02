import {
  mutation,
  MutationCtx,
  query,
  QueryCtx
} from "@/convex/_generated/server"
import { v }                               from "convex/values"

export const createUser = mutation( {
  args   : {
    username: v.string(),
    fullname: v.string(),
    image   : v.string(),
    bio     : v.optional( v.string() ),
    email   : v.string(),
    authId  : v.string()
  },
  handler: async ( ctx, args ) => {

    const existingUser = await ctx.db.query( "users" )
                                  .withIndex( "by_clerk_id",
                                    ( q ) => q.eq( "authId", args.authId ) )
                                  .first()

    const identity = await ctx.auth.getUserIdentity()

    if ( existingUser ) {
      return
    }

    await ctx.db.insert( "users", {
      username : args.username,
      fullname : args.fullname,
      image    : args.image,
      bio      : args.bio,
      email    : args.email,
      authId   : args.authId,
      followers: 0,
      following: 0,
      posts    : 0
    } )
  }
} )

export async function getAuthUser( ctx: QueryCtx | MutationCtx ) {
  const identity = await ctx.auth.getUserIdentity()
  if ( !identity ) {
    throw new Error( "Not authenticated" )
  }
  const user = await ctx.db.query( "users" )
                        .withIndex( "by_clerk_id",
                          ( q ) => q.eq( "authId", identity.subject ) )
                        .first()
  if ( !user ) {
    throw new Error( "User not found" )
  }
  return user
}

export const getUserById = query({
  args   : {
    authId: v.string()
  },
  handler: async ( ctx, args ) => {
    return await ctx.db.query( "users" )
                        .withIndex( "by_clerk_id",
                          ( q ) => q.eq( "authId", args.authId ) )
                        .unique()
  }
})

export const updateProfile = mutation({
  args   : {
    fullname: v.string(),
    bio     : v.optional( v.string() )
  },
  handler: async ( ctx, args ) => {
    const user = await getAuthUser( ctx )
    await ctx.db.patch( user._id, {
      fullname: args.fullname,
      bio     : args.bio
    } )
  }
})


export const getUserProfile = query( {
  args   : {
    userId: v.id( "users" )
  },
  handler: async ( ctx, args ) => {
    const user = await ctx.db.get( args.userId )
    if ( !user ) {
      throw new Error( "User not found" )
    }
    return user
  }
} )

export const isFollowing = query( {
  args   : {
    followingId: v.id( "users" )
  },
  handler: async ( ctx, args ) => {
    const authUser = await getAuthUser( ctx )
    if ( !authUser ) {
      throw new Error( "Not authenticated" )
    }
    const follow = await ctx.db.query( "follows" )
                            .withIndex( "by_both",
                              q => q.eq( "followerId", authUser._id )
                                    .eq( "followingId", args.followingId ) )
                            .first()
    return Boolean( follow )
  }
} )


export const toggleFollow = mutation( {
  args   : {
    followingId: v.id( "users" )
  },
  handler: async ( ctx, args ) => {
    const authUser = await getAuthUser( ctx )
    if ( !authUser ) {
      throw new Error( "Not authenticated" )
    }
    const follow = await ctx.db.query( "follows" )
                            .withIndex( "by_both",
                              q => q.eq( "followerId", authUser._id )
                                    .eq( "followingId", args.followingId ) )
                            .first()

    if ( follow ) {
      await ctx.db.delete( follow._id )
      await updateFollowsCounts( ctx, authUser._id, args.followingId, false )
      return false
    }
    else {
      await ctx.db.insert( "follows", {
        followerId : authUser._id,
        followingId: args.followingId
      } )
      await updateFollowsCounts( ctx, authUser._id, args.followingId, true )
      await ctx.db.insert( "notifications", {
        receiverId: args.followingId,
        senderId  : authUser._id,
        type      : "follow"
      } )
      return true
    }
  }
} )

async function updateFollowsCounts(
  ctx: MutationCtx,
  followerId: string,
  followingId: string,
  isFollowing: boolean
)
{
  const follower  = await ctx.db.get( followerId )
  const following = await ctx.db.get( followingId )

  if ( follower && following ) {
    await ctx.db.patch( follower._id, {
      following: follower.following + ( isFollowing ? 1 : -1 )
    } )

    await ctx.db.patch( following._id, {
      followers: following.followers + ( isFollowing ? 1 : -1 )
    } )
  }
}
