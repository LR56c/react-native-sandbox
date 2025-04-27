export interface Recipe {
  recipeName: string
  description: string
  ingredients: string[]
}

export interface RecipeDetail {
  _id: string
  imageUrl: string
  recipeName: string
  data:{
    description: string
    recipeName: string
    calories: string
    category: string[]
    cookTime: number
    imagePrompt: string
    ingredients: {
      icon: string
      ingredient: string
      quantity: string
    }[]
    serveTo: number
    steps: string[]
  }
}
