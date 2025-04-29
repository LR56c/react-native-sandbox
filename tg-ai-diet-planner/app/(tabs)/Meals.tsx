import { FlatList, Platform, Text, View } from "react-native"
import GenerateRecipeCard                 from "@/components/GenerateRecipeCard"
import { useConvex, useQuery }            from "convex/react"
import { api }                            from "@/convex/_generated/api"
import { RecipeDetail }                   from "@/shared/recipe"
import RecipeCard                         from "@/components/RecipeCard"

export default function Meals() {
  const convex                      = useConvex()
  const recipesList: RecipeDetail[] = useQuery( api.recipes.GetAllRecipes )
  return (
    <FlatList data={ [] } renderItem={ () => null }
              ListHeaderComponent={
                <View className={ `${ Platform.OS === "ios"
                  ? "p-8"
                  : "p-4" } flex flex-col gap-4 h-full` }>
                  <Text className="text-xl font-bold">Discover Recipes</Text>
                  <GenerateRecipeCard/>
                  <View>
                    <FlatList
                      data={ recipesList }
                      numColumns={ 2 }
                      renderItem={ ( { item } ) => (
                        <RecipeCard recipe={ item }/>
                      ) }
                    />
                  </View>
                </View>
              }
    />

  )
}
