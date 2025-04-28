import { Image, Text, View }              from "react-native"
import { RecipeDetail }                   from "@/shared/recipe"
import { HugeiconsIcon }                  from "@hugeicons/react-native"
import {
  Fire03Icon,
  PlusSignSquareIcon, ServingFoodIcon,
  TimeQuarter02Icon
} from "@hugeicons/core-free-icons"
import RecipeInfo                         from "@/components/RecipeInfo"

interface RecipeIntroProps {
  recipeDetail: RecipeDetail
}

export default function RecipeIntro( { recipeDetail }: RecipeIntroProps ) {
  return (
    <View>
      <Image resizeMode="cover" className="w-full h-40 rounded-xl mb-4"
             source={ { uri: recipeDetail.imageUrl } }/>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-2xl font-bold">{ recipeDetail.recipeName }</Text>
        <HugeiconsIcon size={ 32 } color="#862afe" icon={ PlusSignSquareIcon }/>
      </View>
      <Text
        className="text-md text-gray-400">{ recipeDetail.data.description }</Text>
      <View className="flex flex-row justify-between gap-4 mt-4">
        <RecipeInfo label="Calories" value={ recipeDetail.data.calories } icon={
          <HugeiconsIcon
            size={ 32 }
            color="#862afe"
            icon={ Fire03Icon }
          />
        }/>
        <RecipeInfo label="Time" value={ `${recipeDetail.data.cookTime}m` } icon={
          <HugeiconsIcon
            size={ 32 }
            color="#862afe"
            icon={ TimeQuarter02Icon }
          />
        }/>
        <RecipeInfo label="Serve" value={ recipeDetail.data.serveTo.toString() } icon={
          <HugeiconsIcon
            size={ 32 }
            color="#862afe"
            icon={ ServingFoodIcon }
          />
        }/>
      </View>
    </View>
  )
}
