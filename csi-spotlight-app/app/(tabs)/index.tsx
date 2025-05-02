import { FlatList, Pressable, ScrollView, Text, View } from "react-native"
import { useAuth }                                     from "@clerk/clerk-expo"
import { styles }                          from "@/styles/feed.styles"
import { Ionicons }                        from "@expo/vector-icons"
import { COLORS }                          from "@/constants/theme"
import { useQuery }                        from "convex/react"
import { api }                             from "@/convex/_generated/api"
import Loader                              from "@/components/Loader"
import Post                                from "@/components/Post"
import { STORIES }                         from "@/constants/mock_data"
import Story                               from "@/components/Story"
import StoriesSection
                                                       from "@/components/StoriesSection"

export default function Index() {
  const { signOut } = useAuth()
  const posts       = useQuery( api.posts.getFeedPosts )

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
