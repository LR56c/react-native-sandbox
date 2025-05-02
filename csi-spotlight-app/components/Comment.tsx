import { Image, Text, View }   from "react-native"
import { styles }              from "@/styles/feed.styles"
import { formatDistanceToNow } from "date-fns"

type Comment = {
  _id: string
  _creationTime: number
  userId: string
  postId: string
  content: string
  user: {
    fullname: string
    image: string
  }
}

interface CommentProps {
  comment: Comment
}

export default function Comment( { comment }: CommentProps ) {
  return (
    <View style={ styles.commentContainer }>
      <Image source={ { uri: comment.user.image } }
             style={ styles.commentAvatar }/>
      <View style={ styles.commentContent }>
        <Text style={ styles.commentUsername }>{ comment.user.fullname }</Text>
        <Text style={ styles.commentText }>{ comment.content }</Text>
        <Text style={ styles.commentTime }>
          { formatDistanceToNow( comment._creationTime, { addSuffix: true } ) }
        </Text>
      </View>
    </View>
  )
}
