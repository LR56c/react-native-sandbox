import { RecipeDetail } from "@/shared/recipe"

export interface MealPlan {
  _id: string
  userId: string
  recipeId: string
  date: string
  mealType: string
  status: boolean
}

export interface TodayMeal {
  mealPlan : MealPlan
  recipe: RecipeDetail
}
