import { FlatList, Image, Platform, Pressable, Text, View } from "react-native"
import {
  AnalyticsUpIcon,
  CookBookIcon,
  Login03Icon,
  ServingFoodIcon,
  WalletAdd02Icon
}                                                           from "@hugeicons/core-free-icons"
import {
  useUserStore
}                                                           from "@/store/useUser"
import {
  HugeiconsIcon
}                                                           from "@hugeicons/react-native"
import { useRouter }                                        from "expo-router"
import {
  signOut
}                                                           from "@firebase/auth"
import { auth }                                             from "@/firebase"

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
  },
  {
    title: "Billing",
    icon : WalletAdd02Icon,
    path : "/billing"
  },
  {
    title: "Logout",
    icon : Login03Icon,
    path : "/logout"
  }
]
export default function Profile() {
  const user        = useUserStore( ( state ) => state.user )
  const router      = useRouter()
  const onMenuClick = async ( item ) => {
    if ( !item ) return
    if ( item.path === "/logout" ) {
      await signOut( auth )
      router.replace( "/" )
      return
    }
    router.push( item.path )
  }

  return (
    <View className={ `${ Platform.OS === "ios"
      ? "p-8"
      : "p-4" } flex flex-col gap-4 h-full` }>
      <Text className="text-xl font-bold">Profile</Text>

      <View className="flex items-center gap-2">
        <Image className="w-20 h-20 rounded-full"
               source={ require( "../../assets/images/user_icon.jpeg" ) }/>
        <Text className="font-bold text-lg">{ user?.name }</Text>
        <Text className="text-gray-500 text-md">{ user?.email }</Text>
      </View>
      <FlatList data={ menuOptions }
                renderItem={ ( { item } ) => (
                  <Pressable onPress={ () => onMenuClick( item ) }
                             className="flex flex-row items-center gap-2 rounded-xl p-2 mb-4 bg-white">
                    <HugeiconsIcon icon={ item.icon } size={ 35 }
                                   color="#862afe"/>
                    <Text
                      className="text-xl font-semibold">{ item.title }</Text>
                  </Pressable>
                ) }
      />
    </View>
  )
}
