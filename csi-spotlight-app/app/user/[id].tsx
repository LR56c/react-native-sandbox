import { FlatList, Pressable, ScrollView, Text, View } from "react-native"
import { useMutation, useQuery }                       from "convex/react"
import {
  api
}                                          from "@/convex/_generated/api"
import { useLocalSearchParams, useRouter } from "expo-router"
import Loader
                                           from "@/components/Loader"
import { Ionicons }                                    from "@expo/vector-icons"
import { COLORS }                                      from "@/constants/theme"
import {
  styles
}                                                      from "@/styles/profile.styles"
import { Image }                                       from "expo-image"

export default function Detail() {
  const router = useRouter()
  const { id }       = useLocalSearchParams()
  const profile      = useQuery( api.users.getUserProfile, { userId: id } )
  const posts        = useQuery( api.posts.getPostById, { userId: id } )
  const isFollowing  = useQuery( api.users.isFollowing, { followingId: id } )
  const toggleFollow = useMutation( api.users.toggleFollow )
  const handleBack   = () => {
    if( router.canGoBack() ) {
      router.back()
    }
    else{
      router.replace( "/(tabs)" )
    }
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
      <ScrollView showsVerticalScrollIndicator={ false }>
        <View style={ styles.profileInfo }>
          <View style={ styles.avatarAndStats }>
            <Image
              source={ profile.image }
              style={ styles.avatar }
              contentFit="cover"
              cachePolicy="memory-disk"
            />
            <View style={ styles.statsContainer }>
              <View style={ styles.statItem }>
                <Text style={ styles.statNumber }>{ profile.posts }</Text>
                <Text style={ styles.statLabel }>Posts</Text>
              </View>
              <View style={ styles.statItem }>
                <Text
                  style={ styles.statNumber }>{ profile.followers }</Text>
                <Text style={ styles.statLabel }>Followers</Text>
              </View>
              <View style={ styles.statItem }>
                <Text
                  style={ styles.statNumber }>{ profile.following }</Text>
                <Text style={ styles.statLabel }>Following</Text>
              </View>
            </View>
          </View>
          <Text style={ styles.name }>{ profile.fullname }</Text>
          { profile.bio ? (
            <Text style={ styles.bio }>{ profile.bio }</Text>
          ) : null }
          <Pressable style={ [
            styles.followButton, isFollowing ? styles.followingButton : {}
          ] }
                     onPress={ async () => toggleFollow(
                       { followingId: id } ) }>
            <Text style={ [
              styles.followButtonText,
              isFollowing ? styles.followingButtonText : {}
            ] }>
              { isFollowing ? "Unfollow" : "Follow" }
            </Text>
          </Pressable>
        </View>
        <View style={ styles.postsGrid }>
          { posts.length === 0 ? (
            <View style={ styles.noPostsContainer }>
              <Ionicons name="images-outline" size={ 48 }
                        color={ COLORS.grey }/>
              <Text style={ styles.noPostsText }>No posts yet</Text>
            </View>
          ) : (
            <FlatList data={ posts }
                      numColumns={ 3 }
                      scrollEnabled={ false }
                      renderItem={ ( { item } ) => (
                        <Pressable style={ styles.gridItem }>
                          <Image
                            source={ item.imageUrl }
                            style={ styles.gridImage }
                            contentFit="cover"
                            transition={ 200 }
                            cachePolicy="memory-disk"
                          />
                        </Pressable>
                      ) }
            />
          ) }
        </View>
      </ScrollView>
    </View>
  )
}
