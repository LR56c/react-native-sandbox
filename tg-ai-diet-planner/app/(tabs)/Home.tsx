import { FlatList, View } from "react-native"
import { useUserStore }   from "@/store/useUser"
import { useEffect }      from "react"
import { useRouter }      from "expo-router"
import HomeHeader         from "@/components/HomeHeader"
import TodayProgress      from "@/components/TodayProgress"
import { useConvex }      from "convex/react"
import GenerateRecipeCard from "@/components/GenerateRecipeCard"
import TodayMealPlan      from "@/components/TodayMealPlan"
import Button             from "@/components/Button"

export default function Home() {
  const user      = useUserStore( ( state ) => state.user )
  const setUser   = useUserStore( ( state ) => state.setUser )
  const router    = useRouter()
  const convex    = useConvex()
  const checkUser = async () => {
    // const renew = await convex.query( api.users.GetUser,
    //   { email: user?.email } )
    if ( !user?.weight ) {
      router.replace( "/preference" )
    }
    // else {
    //   setUser( { ...renew } )
    //   router.replace( "/(tabs)/Home" )
    // }
  }
  useEffect( () => {
    if ( !user?.weight ) {
      checkUser()
    }
  }, [user] )

  return (
    <FlatList
      data={ [] }
      renderItem={ () => null }
      ListHeaderComponent={(
        <View className="flex gap-4 p-4">
          <HomeHeader/>
          <TodayProgress/>
          <GenerateRecipeCard/>
          <TodayMealPlan/>
          <Button loading={ false } onPress={ () => router.push(
            "/recipe-detail/jd72nayb3axynrnkawr0jn1nyn7et7n4" ) } title="test"/>
        </View>
      )}
    />
  )
}
