import { Image, Text, View } from "react-native"
import Button                from "@/components/Button"
import { useRouter }         from "expo-router"
import AntDesign from '@expo/vector-icons/AntDesign';
export default function Index() {
  const router = useRouter()
  return (
    <View
      className="flex-1 items-center justify-center relative">
      <Image className="w-full h-full"
             resizeMode="cover"
             source={ require( "./../assets/images/food.jpg" ) }/>
      <View
        className="absolute flex items-center p-4 h-full bg-black/50 w-full gap-4">
        <Image className="w-20 h-20 mt-20"
               source={ require( "./../assets/images/food_logo.png" ) }/>
        <Text className="text-xl font-bold text-white">AI Diet Planner</Text>
        <Text className="text-center mx-20 text-lg text-white/80">
          Craft your personalized diet plan with the power of AI
        </Text>
      </View>
      <View className="absolute w-full bottom-0 p-4">
        <Button onPress={() => router.push('/auth/SignIn')} title="Get Started"/>
      </View>
    </View>
  )
}
