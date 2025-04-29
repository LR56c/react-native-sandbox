import { Image, Platform, Text, View } from "react-native"
import {
  AnalyticsUpIcon,
  CookBookIcon,
  ServingFoodIcon
}                                      from "@hugeicons/core-free-icons"

const menuOptions = [
  {
    title: "My Progress",
    icon : AnalyticsUpIcon,
    path : "/(tabs)/Progress"
  },
  {
    title: "Explore Recipes",
    icon : CookBookIcon,
    path : "/(tabs)/Meals"
  },
  {
    title: "Ai Recipes",
    icon : ServingFoodIcon,
    path : "/generate-recipe"
  }

]

export default function Profile() {
  return (
    <View className={ `${ Platform.OS === "ios"
      ? "p-8"
      : "p-4" } flex flex-col gap-4 h-full` }>
      <Text className="text-xl font-bold">Profile</Text>
      <View className="flex items-center">
        <Image className="w-20 h-20 rounded-full"
               source={ require( "../../assets/images/user_icon.jpeg" ) }/>
      </View>
    </View>
  )
}
