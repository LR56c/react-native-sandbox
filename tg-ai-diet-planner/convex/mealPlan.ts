import { mutation, query } from "@/convex/_generated/server"
import { v }               from "convex/values"

export const CreateMealPlan = mutation( {
  args   : {
    userId  : v.id( "users" ),
    recipeId: v.id( "recipes" ),
    date    : v.string(),
    mealType: v.string()
  },
  handler: async ( ctx, args ) => {
    const result = await ctx.db.insert( "mealPlan", {
      userId  : args.userId,
      recipeId: args.recipeId,
      date    : args.date,
      mealType: args.mealType
    } )
    return result
  }
} )

export const GetTodaysMealPlan = query( {
  args   : {
    userId: v.id( "users" ),
    date  : v.string()
  },
  handler: async ( ctx, args ) => {
    const meals = await ctx.db.query( "mealPlan" )
                           .filter( q => q.and(
                             q.eq( q.field( "userId" ), args.userId ),
                             q.eq( q.field( "date" ), args.date ) ) )
                           .collect()
    return await Promise.all(
      meals.map( async ( mealPlan ) => {
        const recipe = await ctx.db.get( mealPlan.recipeId )
        return {
          mealPlan,
          recipe
        }
      } )
    )
  }
} )

export const UpdateStatus = mutation( {
  args   : {
    id      : v.id( "mealPlan" ),
    status  : v.boolean(),
    calories: v.number()
  },
  handler: async ( ctx, args ) => {
    const result = await ctx.db.patch( args.id, {
      status  : args.status,
      calories: args.calories
    } )
    return result
  }
} )

export const GetTotalCaloriesConsumed = query( {
  args   : {
    userId: v.id( "users" ),
    date  : v.string()
  },
  handler: async ( ctx, args ) => {
    const meals = await ctx.db.query( "mealPlan" )
                           .filter( q => q.and(
                             q.eq( q.field( "userId" ), args.userId ),
                             q.eq( q.field( "date" ), args.date ),
                             q.eq( q.field( "status" ), true ) )
                           )
                           .collect()
    return meals.reduce( ( acc, meal ) => {
      if ( typeof meal.calories === "number" ) {
        return acc + meal.calories
      }
    }, 0 )
  }
} )
