import { FlatList, Text, View } from "react-native"
import { RecipeDetail }         from "@/shared/recipe"

interface RecipeIngredientsProps {
  recipeDetail: RecipeDetail
}

export default function RecipeIngredients( { recipeDetail }: RecipeIngredientsProps ) {
  return (
    <FlatList
      ListHeaderComponent={
        props => (
          <Text className="font-bold text-lg">Ingredients</Text>
        )
      }
      data={ recipeDetail.data.ingredients }
      renderItem={ ( { item } ) => (
        <View>
          <View>
            <Text>{ item.icon }</Text>
          </View>
        </View>
      ) }/>
  )
}
