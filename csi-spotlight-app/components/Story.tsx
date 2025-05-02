import { Image, Pressable, Text, View } from "react-native"
import { styles }                       from "@/styles/feed.styles"

type Story = {
  id: string
  username: string
  avatar: string
  hasStory: boolean
}

interface StoryProps {
  story : Story
}

export default function Story({story}: StoryProps) {
  return (
    <Pressable style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory ? styles.noStory : {}]}>
        <Image source={{uri: story.avatar}} style={styles.storyAvatar}/>
      </View>
      <Text style={styles.storyUsername}>{story.username}</Text>
    </Pressable>
  )
}
