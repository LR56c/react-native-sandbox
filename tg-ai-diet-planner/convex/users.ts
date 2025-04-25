import { mutation, query } from "@/convex/_generated/server"
import { v }        from "convex/values"

export const CreateNewUser = mutation( {
  args   : {
    email: v.string(),
    name : v.string()
  },
  handler: async ( ctx, args ) => {
    const user = await ctx.db.query( "users" )
                          .filter( q => q.eq( q.field( "email" ), args.email ) )
                          .first()

    if ( user ) {
      throw new Error( "User already exists" )
    }

    return await ctx.db.insert( "users", {
      email: args.email,
      name : args.name,
      credits: 10
    } )
  }
} )

export const GetUser = query({
  args:{
    email: v.string()
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first()

    if (!user) {
      throw new Error("User not found")
    }

    return user
  }
})
