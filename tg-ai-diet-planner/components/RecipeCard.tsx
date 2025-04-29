import { Image, Text, View }       from "react-native"
import { RecipeDetail }            from "@/shared/recipe"
import { HugeiconsIcon }           from "@hugeicons/react-native"
import { Clock01Icon, Fire02Icon } from "@hugeicons/core-free-icons"
import { Link }                    from "expo-router"

interface RecipeCardProps {
  recipe: RecipeDetail
}


export default function RecipeCard( { recipe }: RecipeCardProps ) {
  return (
    <Link href={ `/recipe-detail/${ recipe._id }` }
          className="flex-1 bg-white rounded-2xl m-2">
      <Image style={ {
        borderTopLeftRadius : 12,
        borderTopRightRadius: 12
      } } resizeMode="cover" className="w-full h-28"
             source={ { uri: recipe.imageUrl } }/>
      <View className="flex-1 gap-1 p-2">
        <Text className="text-sm font-bold">{ recipe.recipeName }</Text>

        <View className="flex flex-row gap-2 items-center">

          <View className="flex flex-row gap-2 items-center">
            <HugeiconsIcon size={ 18 } color="red" icon={ Fire02Icon }/>
            <Text
              className="text-md text-gray-500">{ recipe.data.calories } kcal</Text>
          </View>
          <View className="flex flex-row gap-2 items-center">
            <HugeiconsIcon size={ 18 } color="red" icon={ Clock01Icon }/>
            <Text
              className="text-md text-gray-500">{ recipe.data.cookTime }m</Text>
          </View>

        </View>
      </View>
    </Link>
  )
}
