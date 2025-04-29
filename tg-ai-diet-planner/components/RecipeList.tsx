import { Pressable, Text, View } from "react-native"
import { Recipe }                from "@/shared/recipe"
import {
  GENERATE_COMPLETE_RECIPE_PROMPT,
  GenerateCompleteRecipeBot,
  GenerateRecipeImageBot
}                                from "@/ai_model"
import LoadingDialog             from "@/components/LoadingDialog"
import { useState }              from "react"
import { api }                   from "@/convex/_generated/api"
import { useMutation }           from "convex/react"
import { useUserStore }          from "@/store/useUser"
import { useRouter }             from "expo-router"

interface RecipeListProps {
  recipes: Recipe[]
}

export default function RecipeList( { recipes }: RecipeListProps ) {
  const [loading, setLoading] = useState( false )
  const CreateRecipe          = useMutation( api.recipes.CreateRecipe )
  const user                  = useUserStore( ( state ) => state.user )
  const router = useRouter()
  const handleRecipeSelect    = async ( recipe: Recipe ) => {
    setLoading( true )
    try {

      const PROMPT      = `RecipeName: ${ recipe.recipeName }. Description: ${ GENERATE_COMPLETE_RECIPE_PROMPT }`
      const aiResult    = await GenerateCompleteRecipeBot( PROMPT )
      const jsonContent = JSON.parse(
        aiResult.choices[0].message.content?.replace( "```json", "" )
                           .replace( "```", "" ) ) ?? []
      const imageResult = await GenerateRecipeImageBot(
        jsonContent.imagePrompt )
      const saveRecipeResult = await CreateRecipe( {
        data      : jsonContent,
        userId    : user?.id,
        imageUrl  : imageResult.data.image,
        recipeName: recipe.recipeName
      } )
      router.push(`/recipe-detail/${saveRecipeResult}`)
    }
    catch ( e ) {
      console.log( "error recipe select", e )
    }
    finally {
      setLoading( false )
    }
  }
  return (
    <View className="flex flex-col gap-4">
      <Text className="text-xl font-bold">Select Recipe</Text>
      { recipes.map( ( recipe, index ) => (
        <Pressable key={ index }
                   onPress={ () => handleRecipeSelect( recipe ) }
                   className="bg-white p-4 rounded-lg border border-black">
          <Text className="text-lg font-bold">{ recipe.recipeName }</Text>
          <Text numberOfLines={ 2 }>{ recipe.description }</Text>
        </Pressable>
      ) ) }
      <LoadingDialog loading={ loading }/>
    </View>
  )
}
