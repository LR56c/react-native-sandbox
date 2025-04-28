import { FlatList, Platform, Text, View } from "react-native"
import RecipeIntro                        from "@/components/RecipeIntro"
import { useLocalSearchParams }           from "expo-router/build/hooks"
import { useQuery }                       from "convex/react"
import { api }                            from "@/convex/_generated/api"
import RecipeIngredients                  from "@/components/RecipeIngredients"
import RecipeSteps                        from "@/components/RecipeSteps"
import Button                             from "@/components/Button"

export default function detail() {

  // const actionSheetRef     = useRef()
  const { id }             = useLocalSearchParams()
  const recipeDetailResult = useQuery( api.recipes.GetRecipe, {
    id: id
  } )

  const onPress = () => {
    console.log( "onPress" )
    // actionSheetRef.current?.show()
  }

  return (
    <View className="relative">
      <FlatList data={ [] } renderItem={ () => null }
                ListHeaderComponent={
                  <View className={ `${ Platform.OS === "ios"
                    ? "p-8"
                    : "p-4" } flex-1 flex-col gap-4 h-full` }>
                    { recipeDetailResult ?
                      <View style={ {
                        paddingBottom: 70
                      } }>
                        <RecipeIntro recipeDetail={ recipeDetailResult }/>
                        <RecipeIngredients recipeDetail={ recipeDetailResult }/>
                        <RecipeSteps recipeDetail={ recipeDetailResult }/>
                      </View>
                      : <Text>Loading...</Text> }
                  </View>
                }
      />
      <View className="absolute w-full bottom-0 z-50 p-4">
        <Button onPress={ () => onPress } loading={ false }
                title="Add To Meal Plan"/>
      </View>
    </View>
  )
}
