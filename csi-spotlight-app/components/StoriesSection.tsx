import { ScrollView, Text, View } from "react-native"
import { styles }                 from "@/styles/feed.styles"
import { STORIES }                from "@/constants/mock_data"
import Story                      from "@/components/Story"

export default function StoriesSection() {
  return (
    <ScrollView
      horizontal showsHorizontalScrollIndicator={false}
      style={styles.storiesContainer}
    >
      { STORIES.map( ( story ) => (
        <Story story={ story } key={ story.id }/>
      ) )}
    </ScrollView>
  )
}
