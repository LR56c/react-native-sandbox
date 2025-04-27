import { mutation, query } from "@/convex/_generated/server"
import { v }               from "convex/values"

export const CreateRecipe = mutation( {
  args   : {
    userId: v.id("users"),
    data: v.any(),
    imageUrl: v.string(),
    recipeName: v.string()
  },
  handler: async ( ctx, args ) => {
    const result = await ctx.db.insert( 'recipes', {
      userId: args.userId,
      data  : args.data,
      imageUrl: args.imageUrl,
      recipeName: args.recipeName
    } )
    return result
  }
} )

export const GetRecipe = query( {
  args   : {
    id: v.id('recipes')
  },
  handler: async ( ctx, args ) => {
    return await ctx.db.get( args.id )
  }
} )
