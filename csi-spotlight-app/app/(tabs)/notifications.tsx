import { FlatList, Text, View } from "react-native"
import { useQuery }             from "convex/react"
import { api }                  from "@/convex/_generated/api"
import Loader                   from "@/components/Loader"
import { styles }               from "@/styles/notifications.styles"
import { Ionicons }             from "@expo/vector-icons"
import { COLORS }               from "@/constants/theme"
import NotificationItem         from "@/components/NotificationItem"

export default function Notifications() {
  const notifications = useQuery( api.notifications.getNotifications )

  if ( !notifications ) {
    return (
      <Loader/>
    )
  }

  if ( notifications.length === 0 ) {
    return (
      <NoNotificationsFound/>
    )
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Text style={ styles.headerTitle }>Notifications</Text>
      </View>
      <FlatList data={ notifications }
                contentContainerStyle={styles.listContainer}
                keyExtractor={ ( item ) => item._id }
                showsVerticalScrollIndicator={false}
                renderItem={ ( { item } ) => (
                  <NotificationItem notification={ item }/>
                ) }
      />
    </View>
  )
}

const NoNotificationsFound = () => (
  <View style={ [styles.container, styles.centered] }>
    <Ionicons name="notifications-outline" size={ 48 }
              color={ COLORS.primary }/>
    <Text style={ {
      fontSize: 20, color: COLORS.white
    } }>No notifications yet</Text>
  </View>
)
