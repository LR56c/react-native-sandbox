import { Text, View }   from "react-native"
import { useUserStore } from "@/store/useUser"
import { useEffect }    from "react"
import { useRouter }    from "expo-router"

export default function Home() {
  const user   = useUserStore( ( state ) => state.user )
  const router = useRouter()
  useEffect( () => {
    if ( !user?.weight ) {
      router.replace( "/preference" )
    }
  }, [user] )

  return (
    <View>
      <Text>home</Text>
    </View>
  )
}
