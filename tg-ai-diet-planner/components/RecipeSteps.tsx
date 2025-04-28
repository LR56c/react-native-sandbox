import { FlatList, Text, View } from "react-native"
import { RecipeDetail }         from "@/shared/recipe"

interface RecipeStepsProps {
  recipeDetail: RecipeDetail
}

export default function RecipeSteps( { recipeDetail }: RecipeStepsProps ) {
  const steps = recipeDetail.data.steps
  return (
    <View>
      <Text className="font-semibold text-lg mb-4">Directions</Text>
      <FlatList data={ steps } renderItem={ ( { item, index } ) => (
        <View className="flex border p-2 border-black rounded-lg flex-row items-center gap-4 mb-4">
          <View
            className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Text className="text-lg text-white">{ index + 1 }</Text>
          </View>
          <Text className="flex-1 text-lg">{ item }</Text>
        </View>
      ) }/>
    </View>
  )
}
