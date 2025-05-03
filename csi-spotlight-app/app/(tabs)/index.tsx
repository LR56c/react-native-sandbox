import { FlatList, Pressable, RefreshControl, Text, View } from "react-native"
import {
  useAuth
}                                                          from "@clerk/clerk-expo"
import {
  styles
}                                                          from "@/styles/feed.styles"
import {
  Ionicons
}                                                          from "@expo/vector-icons"
import {
  COLORS
}                                                          from "@/constants/theme"
import { useQuery }                                        from "convex/react"
import {
  api
}                                                          from "@/convex/_generated/api"
import Loader
                                                           from "@/components/Loader"
import Post
                                                           from "@/components/Post"
import StoriesSection
                                                           from "@/components/StoriesSection"
import { useState }                                        from "react"

export default function Index() {
  const { signOut }                 = useAuth()
  const [refreshing, setRefreshing] = useState( false )
  const posts                       = useQuery( api.posts.getFeedPosts )

  const onRefreshing = async () => {
    setRefreshing( true )
    setTimeout( () => {
      setRefreshing( false )
    }, 2000)
  }

  if ( !posts ) {
    return (
      <Loader/>
    )
  }

  if ( posts.length === 0 ) {
    return (
      <NoPostsFound/>
    )
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Text style={ styles.headerTitle }>spotlight</Text>
        <Pressable onPress={ () => signOut() }>
          <Ionicons name="log-out-outline" size={ 24 } color={ COLORS.white }/>
        </Pressable>
      </View>
      <FlatList data={ posts }
                renderItem={ ( { item } ) => <Post post={ item }/> }
                keyExtractor={ ( item ) => item._id }
                showsVerticalScrollIndicator={ false }
                contentContainerStyle={ { paddingBottom: 60 } }
                refreshControl={
                  <RefreshControl
                    refreshing={ refreshing }
                    onRefresh={ onRefreshing }
                    tintColor={ COLORS.primary }
                  />
                }
                ListHeaderComponent={ <StoriesSection/> }
      />
    </View>
  )
}

const NoPostsFound = () => (
  <View style={ {
    flex           : 1,
    backgroundColor: COLORS.background,
    justifyContent : "center",
    alignItems     : "center"
  } }>
    <Text style={ {
      fontSize: 20,
      color   : COLORS.primary
    } }>No posts yet</Text>
  </View>
)
