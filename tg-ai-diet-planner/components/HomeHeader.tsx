import { Image, Text, View } from "react-native"
import { useUserStore }      from "@/store/useUser"

export default function HomeHeader(  ) {
  const user = useUserStore( ( state ) => state.user )

  return (
    <View className="flex flex-row items-center gap-4">
      <Image className="w-16 h-16 rounded-full bg-red-200 " source={require('../assets/images/user_icon.jpeg')}/>
      <View>
      <Text className="text-lg">Hello 👋</Text>
      <Text className="text-xl font-bold">{user?.name}</Text>
      </View>
    </View>
  )
}
