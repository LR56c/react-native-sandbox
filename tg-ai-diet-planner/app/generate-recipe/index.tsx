import { Keyboard, Platform, Text, View }            from "react-native"
import Input                                         from "@/components/Input"
import { FormProvider, useForm }                     from "react-hook-form"
import {
  zodResolver
}                                                    from "@hookform/resolvers/zod"
import { z }                                         from "zod"
import Button                                        from "@/components/Button"
import { GENERATE_RECIPE_PROMPT, GenerateRecipeBot } from "@/ai_model"
import { useState }                                  from "react"
import { Recipe }                                    from "@/shared/recipe"
import RecipeList
                                                     from "@/components/RecipeList"


const schema = z.object( {
  name: z.string()
         .min( 2, { message: "Name must be at least 2 characters long" } )
} )
export default function index() {
  const [loading, setLoading] = useState( false )
  const [recipes, setRecipes] = useState<Recipe[]>( [] )
  const methods               = useForm( {
    resolver: zodResolver( schema )
  } )

  const onSubmit = async ( data ) => {
    setLoading( true )
    Keyboard.dismiss()
    try {

      const PROMPT      = `${ data.name }:${ GENERATE_RECIPE_PROMPT }`
      const aiResult    = await GenerateRecipeBot( PROMPT )
      const jsonContent = JSON.parse(
        aiResult.choices[0].message.content?.replace( "```json", "" )
                           .replace( "```", "" ) ) ?? []
      console.log( "jsonContent", jsonContent )
      setRecipes( jsonContent )
    }
    catch ( e ) {
      console.log( "error", e )
    }
    finally {
      setLoading( false )
    }
  }
  return (
    <View className={ `${ Platform.OS === "ios"
      ? "p-8"
      : "p-4" } flex flex-col gap-4 h-full` }>
      <FormProvider { ...methods } >
        <Text className="font-bold text-xl">AI Recipe Generator</Text>
        <Text className="text-gray-500 text-lg">Generate personalized recipes
          using AI</Text>
        <Input inputClass="bg-white" multiline={ true } numberOfLines={ 5 }
               name="name"
               placeholder="Enter your ingredient or recipe name"/>
        <Button onPress={ methods.handleSubmit( onSubmit ) }
                loading={ loading }
                title="Generate Recipe"/>
      </FormProvider>
      { recipes.length > 0 ?
        <RecipeList recipes={ recipes }/>
        : null
      }
    </View>
  )
}
