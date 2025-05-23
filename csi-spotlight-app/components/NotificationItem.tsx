import { Pressable, Text, View } from "react-native"
import { styles }                from "@/styles/notifications.styles"
import { Link }                  from "expo-router"
import { Image }                 from "expo-image"
import { Ionicons }              from "@expo/vector-icons"
import { COLORS }                from "@/constants/theme"
import { formatDistanceToNow }   from "date-fns"

interface NotificationItemProps {
  notification: any
}

export default function NotificationItem( { notification }: NotificationItemProps ) {
  return (
    <View style={ styles.notificationItem }>
      <View style={ styles.notificationContent }>
        <Link href={ `/user/${notification.sender._id}` } asChild>
          <Pressable style={ styles.avatarContainer }>
            <Image
              source={ notification.sender.image }
              style={ styles.avatar }
              contentFit="cover"
              transition={ 200 }
            />
            <View style={ styles.iconBadge }>
              { notification.type === "like" ? (
                <Ionicons name="heart" size={ 14 } color={ COLORS.primary }/>
              ) : notification.type === "follow" ? (
                  <Ionicons name="person-add" size={ 14 } color="#8b5cf6"/>
                ) :
                (
                  <Ionicons name="chatbubble" size={ 14 } color="#8b5cf6"/>
                )
              }
            </View>
          </Pressable>
        </Link>
        <View style={ styles.notificationInfo }>
          <Link href={ `/user/${notification.sender._id}` } asChild>
            <Pressable>
              <Text
                style={ styles.username }>{ notification.sender.username }</Text>
            </Pressable>
          </Link>
          <Text style={ styles.action }>{ notification.type === "follow"
              ? "started following you"
              : notification.type === "like" ? " liked your post" : `commented: "${notification.content}"`}
          </Text>
          <Text style={styles.timeAgo}>
            { formatDistanceToNow( notification._creationTime, { addSuffix: true } ) }
          </Text>
        </View>
      </View>
      {notification.post ? (
        <Image
          source={notification.post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
        />
      ) : null}
    </View>
  )
}
