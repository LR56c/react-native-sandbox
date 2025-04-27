import { Platform, Text, View } from "react-native"
import RecipeIntro              from "@/components/RecipeIntro"
import { useLocalSearchParams } from "expo-router/build/hooks"
import { useQuery }             from "convex/react"
import { api }                  from "@/convex/_generated/api"
import RecipeIngredients        from "@/components/RecipeIngredients"

export default function detail() {

  const { id } = useLocalSearchParams()
  const recipeDetailResult = useQuery( api.recipes.GetRecipe, {
    id: id
  } )
  return (
    <View className={ `${ Platform.OS === "ios"
      ? "p-8"
      : "p-4" } flex-1 flex-col gap-4 h-full` }>
      { recipeDetailResult ?
        <>
          <RecipeIntro recipeDetail={ recipeDetailResult }/>
          <RecipeIngredients recipeDetail={ recipeDetailResult }/>
        </>
        : <Text>Loading...</Text> }
    </View>
  )
}
