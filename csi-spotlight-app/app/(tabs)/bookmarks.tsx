import { ScrollView, Text, View } from "react-native"
import { useQuery }               from "convex/react"
import { api }                    from "@/convex/_generated/api"
import Loader                     from "@/components/Loader"
import { COLORS }                 from "@/constants/theme"
import { styles }                 from "@/styles/feed.styles"
import { Image }                  from "expo-image"

export default function Bookmarks() {
  const bookmarks = useQuery( api.bookmarks.getBookmarkedPosts )

  if ( !bookmarks ) {
    return (
      <Loader/>
    )
  }

  if ( bookmarks.length === 0 ) {
    return (
      <NoBookmarksFound/>
    )
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Text style={ styles.headerTitle }>Bookmarks</Text>
      </View>
      <ScrollView
        contentContainerStyle={ {
          padding      : 8,
          flexDirection: "row",
          flexWrap     : "wrap"
        } }>
        { bookmarks.map( ( post ) => {

          if ( !post ) return null
          return (
            <View key={ post._id } style={ {
              width  : "33.33%",
              padding: 1
            } }>
              <Image
                source={ post.imageUrl }
                style={ { width: "100%", aspectRatio: 1 } }
                contentFit="cover"
                transition={ 200 }
                cachePolicy="memory-disk"
              />
            </View>
          )
        } ) }
      </ScrollView>
    </View>
  )
}

const NoBookmarksFound = () => (
  <View style={ {
    flex           : 1,
    justifyContent : "center",
    alignItems     : "center",
    backgroundColor: COLORS.background
  } }>
    <Text style={ { color: COLORS.primary, fontSize: 22 } }>No Bookmarks posts
      yet</Text>
  </View>
)
