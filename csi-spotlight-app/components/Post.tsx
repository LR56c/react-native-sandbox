import { Pressable, Text, View } from "react-native"
import { styles }                from "@/styles/feed.styles"
import { Link }                  from "expo-router"
import { Image }                 from "expo-image"
import { Ionicons }              from "@expo/vector-icons"
import { COLORS }                from "@/constants/theme"
import { useState }              from "react"
import { useMutation, useQuery } from "convex/react"
import { api }                   from "@/convex/_generated/api"
import CommentsModal             from "@/components/CommentsModal"
import { formatDistanceToNow }   from "date-fns"
import { useUser }               from "@clerk/clerk-expo"

type Post = {
  _id: string
  _creationTime: number
  userId: string
  imageUrl: string
  storageId: string
  caption: string
  likes: number
  comments: number
  author: {
    _id: string,
    username: string,
    image: string,
  }
  isLiked: boolean
  isBookmarked: boolean
}

interface PostProps {
  post: Post
}

export default function Post( { post }: PostProps ) {
  const [isLiked, setIsLiked]             = useState( post.isLiked )
  const [showComments, setShowComments]   = useState( false )
  const [isBookmarked, setIsBookmarked]   = useState( post.isBookmarked )

  const { user }       = useUser()
  const currentUser    = useQuery( api.users.getUserById,
    { authId: user?.id } )
  const toggleLike     = useMutation( api.posts.toggleLike )
  const toggleBookmark = useMutation( api.bookmarks.toggleBookmark )
  const deletePost     = useMutation( api.posts.deletePost )
  const handleLike     = async () => {
    try {
      const like = await toggleLike( { postId: post._id } )
      setIsLiked( like )
    }
    catch ( e ) {
      console.log( "Error like", e )
    }
  }
  const handleBookmark = async () => {
    try {
      const bookmark = await toggleBookmark( { postId: post._id } )
      setIsBookmarked( bookmark )
    }
    catch ( e ) {
      console.log( "Error bookmark", e )
    }
  }

  const handleDeletePost = async () => {
    try {
      await deletePost( { postId: post._id } )
    }
    catch ( e ) {
      console.log( "Error deleting post", e )
    }
  }
  return (
    <View style={ styles.post }>
      <View style={ styles.postHeader }>
        {/*Post header*/ }
        <Link asChild href={
          currentUser?._id === post.author._id
            ? `/(tabs)/profile`
            : `/user/${ post.author._id }`
        }>
          <Pressable style={ styles.postHeaderLeft }>
            <Image
              source={ post.author.image }
              style={ styles.postAvatar }
              contentFit="cover"
              transition={ 200 }
              cachePolicy="memory-disk"
            />
            <Text style={ styles.postUsername }>{ post.author.username }</Text>
          </Pressable>
        </Link>
        { post.author._id === currentUser?._id ? (
          <Pressable onPress={ handleDeletePost }>
            <Ionicons name="trash-outline" size={ 20 }
                      color={ COLORS.primary }/>
          </Pressable>
        ) : (
          <Pressable>
            <Ionicons name="ellipsis-horizontal" size={ 20 }
                      color={ COLORS.white }/>
          </Pressable>
        ) }
      </View>
      {/*image*/ }
      <Image
        source={ post.imageUrl }
        style={ styles.postImage }
        contentFit="cover"
        transition={ 200 }
        cachePolicy="memory-disk"
      />
      {/*  post actions*/ }
      <View style={ styles.postActions }>
        <View style={ styles.postActionsLeft }>
          <Pressable onPress={ handleLike }>
            <Ionicons name={ isLiked ? "heart" : "heart-outline" } size={ 24 }
                      color={ isLiked ? COLORS.primary : COLORS.white }/>
          </Pressable>
          <Pressable onPress={ () => setShowComments( true ) }>
            <Ionicons name="chatbubble-outline" size={ 24 }
                      color={ COLORS.white }/>
          </Pressable>
        </View>
        <Pressable onPress={ handleBookmark }>
          <Ionicons name={ isBookmarked ? "bookmark" : "bookmarks-outline" }
                    size={ 24 }
                    color={ COLORS.white }/>
        </Pressable>
      </View>
      {/*  post info*/ }
      <View style={ styles.postInfo }>
        <Text style={ styles.likesText }>{ post.likes > 0
          ? `${ post.likes.toLocaleString() } likes`
          : "Be the first to like" }</Text>
        { post.caption ?
          <View style={ styles.captionContainer }>
            <Text
              style={ styles.captionUsername }>{ post.author.username }</Text>
            <Text style={ styles.captionText }>{ post.caption }</Text>
          </View>
          : null }
        { post.comments > 0 ? <Pressable
          onPress={ () => setShowComments( true ) }>
          <Text style={ styles.commentsText }>View
            all { post.comments } comments</Text>
        </Pressable> : null }
        <Text style={ styles.timeAgo }>{ formatDistanceToNow(
          post._creationTime, { addSuffix: true } ) }</Text>
      </View>
      <CommentsModal
        postId={ post._id }
        visible={ showComments }
        onClose={ () => setShowComments( false ) }
      />
    </View>
  )
}
