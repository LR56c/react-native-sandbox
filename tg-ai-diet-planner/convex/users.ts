import { mutation, query } from "@/convex/_generated/server"
import { v }               from "convex/values"

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
      email  : args.email,
      name   : args.name,
      credits: 10
    } )
  }
} )

export const GetUser = query( {
  args   : {
    email: v.string()
  },
  handler: async ( ctx, args ) => {
    const user = await ctx.db.query( "users" )
                          .filter( q => q.eq( q.field( "email" ), args.email ) )
                          .first()

    if ( !user ) {
      throw new Error( "User not found" )
    }

    return user
  }
} )

export const UpdateUserPref = mutation( {
  args   : {
    id      : v.id( "users" ),
    height  : v.string(),
    weight  : v.string(),
    gender  : v.string(),
    goal    : v.string(),
    calories: v.number(),
    proteins: v.number()
  },
  handler: async ( ctx, args ) => {
    const result = await ctx.db.patch( args.id, {
      height: args.height,
      weight: args.weight,
      gender: args.gender,
      goal  : args.goal,
      calories: args.calories,
      proteins: args.proteins
    } )
    return result
  }
} )
