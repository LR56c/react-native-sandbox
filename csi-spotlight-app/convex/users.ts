import { mutation, MutationCtx, QueryCtx } from "@/convex/_generated/server"
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
