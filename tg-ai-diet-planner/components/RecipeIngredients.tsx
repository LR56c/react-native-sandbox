import { FlatList, Text, View } from "react-native"
import { RecipeDetail }         from "@/shared/recipe"

interface RecipeIngredientsProps {
  recipeDetail: RecipeDetail
}

export default function RecipeIngredients( { recipeDetail }: RecipeIngredientsProps ) {
  return (
    <View className="mt-4">
      <View className="flex flex-row justify-between items-center">
      <Text className="font-bold text-lg">Ingredients</Text>
      <Text className="font-bold text-lg">{recipeDetail.data.ingredients.length} Items</Text>
      </View>
      <FlatList
        data={ recipeDetail.data.ingredients }
        renderItem={ ( { item } ) => (
          <View className="flex flex-row gap-2 items-center mt-4">
            <View className="flex flex-row gap-2 items-center">
              <Text
                className="bg-secondary rounded-full text-2xl p-2">{ item.icon }</Text>
              <Text className="font-semibold">{ item.ingredient }</Text>
            </View>
            <Text className="text-gray-500 text-lg">{ item.quantity }</Text>
          </View>
        ) }/>
    </View>
  )
}
