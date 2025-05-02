import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
}                                from "react-native"
import { useAuth }               from "@clerk/clerk-expo"
import { useState }              from "react"
import { useMutation, useQuery } from "convex/react"
import { api }                   from "@/convex/_generated/api"
import Loader                    from "@/components/Loader"
import { styles }                from "@/styles/profile.styles"
import { Ionicons }              from "@expo/vector-icons"
import { COLORS }                from "@/constants/theme"
import { Image }                 from "expo-image"

export default function Profile() {
  const { signOut, userId }                         = useAuth()
  const [isEditModalVisible, setIsEditModalVisible] = useState( false )
  const currenUser                                  = useQuery(
    api.users.getUserById, { authId: userId } )
  const [editedProfile, setEditedProfile]           = useState( {
    fullname: currenUser?.fullname ?? "",
    bio     : currenUser?.bio ?? ""
  } )
  const [selectedPost, setSelectedPost]             = useState( null )
  const posts                                       = useQuery(
    api.posts.getPostById )
  const updateProfile                               = useMutation(
    api.users.updateProfile )
  const handleSaveProfile                           = async () => {
    await updateProfile( editedProfile )
    setIsEditModalVisible( false )
  }

  if ( !currenUser || posts === undefined ) return <Loader/>

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <View style={ styles.headerLeft }>
          <Text style={ styles.username }>{ currenUser.username }</Text>
        </View>
        <View style={ styles.headerRight }>
          <Pressable style={ styles.headerIcon } onPress={ () => signOut() }>
            <Ionicons name="log-out-outline" size={ 24 }
                      color={ COLORS.white }/>
          </Pressable>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={ false }>
        <View style={ styles.profileInfo }>
          <View style={ styles.avatarAndStats }>
            <View style={ styles.avatarContainer }>
              <Image
                source={ currenUser.image }
                style={ styles.avatar }
                contentFit="cover"
                transition={ 200 }
              />
            </View>
            <View style={ styles.statsContainer }>
              <View style={ styles.statItem }>
                <Text style={ styles.statNumber }>{ currenUser.posts }</Text>
                <Text style={ styles.statLabel }>Posts</Text>
              </View>
              <View style={ styles.statItem }>
                <Text
                  style={ styles.statNumber }>{ currenUser.followers }</Text>
                <Text style={ styles.statLabel }>Followers</Text>
              </View>
              <View style={ styles.statItem }>
                <Text
                  style={ styles.statNumber }>{ currenUser.following }</Text>
                <Text style={ styles.statLabel }>Following</Text>
              </View>
            </View>
          </View>
          <Text style={ styles.name }>{ currenUser.fullname }</Text>
          { currenUser.bio ? (
            <Text style={ styles.bio }>{ currenUser.bio }</Text>
          ) : null }
          <View style={ styles.actionButtons }>
            <Pressable onPress={ () => setIsEditModalVisible( true ) }
                       style={ styles.editButton }>
              <Text style={ styles.editButtonText }>Edit Profile</Text>
            </Pressable>
            <Pressable style={ styles.shareButton }>
              <Ionicons name="share-outline" size={ 20 }
                        color={ COLORS.white }/>
            </Pressable>
          </View>
        </View>
        { posts.length === 0 ? (
          <NoPostsFound/>
        ) : null
        }
        <FlatList data={ posts }
                  scrollEnabled={ false }
                  numColumns={ 3 }
                  renderItem={ ( { item } ) => (
                    <Pressable style={ styles.gridItem }
                               onPress={ () => setSelectedPost( item ) }>
                      <Image
                        source={ item.imageUrl }
                        style={ styles.gridImage }
                        contentFit="cover"
                        transition={ 200 }
                      />
                    </Pressable>
                  ) }
        />
      </ScrollView>
      {/*edit profile modal*/ }
      <Modal
        visible={ isEditModalVisible }
        animationType="slide"
        transparent
        onRequestClose={ () => setIsEditModalVisible( false ) }
      >
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
          <KeyboardAvoidingView
            behavior={ Platform.OS === "ios" ? "padding" : "height" }
            style={ styles.modalContainer }
          >
            <View style={ styles.modalContainer }>
              <View style={ styles.modalHeader }>
                <Text style={ styles.modalTitle }>Edit Profile</Text>
                <Pressable onPress={ () => setIsEditModalVisible( false ) }>
                  <Ionicons name="close" size={ 24 } color={ COLORS.white }/>
                </Pressable>
              </View>
              <View style={ styles.inputContainer }>
                <Text style={ styles.inputLabel }>Name</Text>
                <TextInput
                  style={ styles.input }
                  value={ editedProfile.fullname }
                  placeholderTextColor={ COLORS.grey }
                  onChangeText={ ( text ) => setEditedProfile(
                    ( prev ) => (
                      { ...prev, fullname: text }
                    ) ) }
                />
              </View>
              <View style={ styles.inputContainer }>
                <Text style={ styles.inputLabel }>Bio</Text>
                <TextInput
                  style={ [styles.input, styles.bioInput] }
                  value={ editedProfile.bio }
                  placeholderTextColor={ COLORS.grey }
                  multiline
                  numberOfLines={ 4 }
                  onChangeText={ ( text ) => setEditedProfile(
                    ( prev ) => (
                      { ...prev, bio: text }
                    ) ) }
                />
              </View>
              <Pressable style={ styles.saveButton }
                         onPress={ handleSaveProfile }>
                <Text style={ styles.saveButtonText }>Save Changes</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
      {/*selected image modal*/ }
      <Modal
        visible={ Boolean( selectedPost ) }
        transparent
        onRequestClose={ () => setSelectedPost( null ) }
      >
        <View style={ styles.modalBackdrop }>
          { selectedPost ? (
            <View style={ styles.postDetailContainer }>
              <View style={ styles.postDetailHeader }>
                <Pressable onPress={ () => setSelectedPost( null ) }>
                  <Ionicons name="close" size={ 24 } color={ COLORS.white }/>
                </Pressable>
              </View>
              <Image
                source={ selectedPost.imageUrl }
                style={ styles.postDetailImage }
                cachePolicy="memory-disk"
              />
            </View>
          ) : null }
        </View>
      </Modal>
    </View>
  )
}


const NoPostsFound = () => (
  <View style={ {
    flex           : 1,
    height         : "100%",
    backgroundColor: COLORS.background,
    justifyContent : "center",
    alignItems     : "center"
  } }>
    <Ionicons name="images-outline" size={ 48 } color={ COLORS.primary }/>
    <Text style={ {
      fontSize: 20,
      color   : COLORS.white
    } }>No posts yet</Text>
  </View>
)
