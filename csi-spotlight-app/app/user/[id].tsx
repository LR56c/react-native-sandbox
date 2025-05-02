import { Pressable, Text, View } from "react-native"
import { useMutation, useQuery } from "convex/react"
import { api }                   from "@/convex/_generated/api"
import { useLocalSearchParams }  from "expo-router"
import Loader                    from "@/components/Loader"
import { Ionicons }              from "@expo/vector-icons"
import { COLORS }                from "@/constants/theme"
import { styles }                from "@/styles/notifications.styles"

export default function Detail() {
  const { id } = useLocalSearchParams()
  console.log( "ID", id )
  const profile      = useQuery( api.users.getUserProfile, { userId: id } )
  const posts        = useQuery( api.posts.getPostById, { userId: id } )
  const isFollowing  = useQuery( api.users.isFollowing, { followingId: id } )
  const toggleFollow = useMutation( api.users.toggleFollow )
  const handleBack   = () => {
  }

  if ( profile === undefined || posts === undefined || isFollowing ===
    undefined )
  {
    return <Loader/>
  }
  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Pressable onPress={ handleBack }>
          <Ionicons name="arrow-back" size={ 24 } color={ COLORS.white }/>
        </Pressable>
        <Text style={ styles.headerTitle }>{ profile.username }</Text>
        <View style={ { width: 24 } }></View>
      </View>
    </View>
  )
}
