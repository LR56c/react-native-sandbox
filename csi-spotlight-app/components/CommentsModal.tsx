import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View
}                                from "react-native"
import { useState }              from "react"
import { api }                   from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { styles }                from "@/styles/feed.styles"
import { Ionicons }              from "@expo/vector-icons"
import { COLORS }                from "@/constants/theme"
import Loader                    from "@/components/Loader"
import Comment                   from "@/components/Comment"

interface CommentsModalProps {
  postId: string
  visible: boolean
  onClose: () => void
  onCommentAdded: ( comment: string ) => void
}

export default function CommentsModal( {
  onCommentAdded,
  onClose,
  postId,
  visible
}: CommentsModalProps )
{
  const [newComment, setNewComment] = useState( "" )
  const comments                    = useQuery( api.comments.getComments,
    { postId } )
  const addComment                  = useMutation( api.comments.addComment )

  const handelAddComment = async () => {
    if ( !newComment.trim() ) return
    try {
      const comment = await addComment( { postId, content: newComment } )
      setNewComment( "" )
      onCommentAdded( comment )
    }
    catch ( e ) {
      console.log( "Error adding comment", e )
    }
  }

  return (
    <Modal visible={ visible } animationType="slide" transparent
           onRequestClose={ onClose }>
      <KeyboardAvoidingView
        behavior={ Platform.OS === "ios" ? "padding" : "height" }
        style={ styles.modalContainer }>
        <View style={ styles.modalHeader }>
          <Pressable onPress={ onClose }>
            <Ionicons name="close" size={ 24 } color={ COLORS.white }/>
          </Pressable>
          <Text style={ styles.modalTitle }>Comments</Text>
          <Text style={ { width: 24 } }></Text>
        </View>
        { comments === undefined ? (
          <Loader/>
        ) : (
          <FlatList
            data={ comments }
            contentContainerStyle={ styles.commentsList }
            keyExtractor={ ( item ) => item._id }
            renderItem={ ( { item } ) => (
              <Comment comment={ item }/>
            ) }
          />
        ) }
        <View style={ styles.commentInput }>
          <TextInput
            style={ styles.input }
            placeholder="Add a comment..."
            placeholderTextColor={ COLORS.grey }
            value={ newComment }
            onChangeText={ setNewComment }
            multiline
          />
          <Pressable onPress={ handelAddComment }
                     disabled={ !newComment.trim() }>
            <Text style={ [
              styles.postButton,
              !newComment.trim() ? styles.postButtonDisabled : {}
            ] }>Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}
