import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
}                                            from "react-native"
import { Image }                             from "expo-image"
import { useRouter }                         from "expo-router"
import { useState }                          from "react"
import { useUser }                           from "@clerk/clerk-expo"
import { styles }                            from "@/styles/create.styles"
import { Ionicons }                          from "@expo/vector-icons"
import { COLORS }                            from "@/constants/theme"
import { launchImageLibraryAsync }           from "expo-image-picker"
import { useMutation }                       from "convex/react"
import { api }                               from "@/convex/_generated/api"
import { FileSystemUploadType, uploadAsync } from "expo-file-system"

export default function Create() {
  const router                            = useRouter()
  const { user }                          = useUser()
  const [caption, setCaption]             = useState( "" )
  const [selectedImage, setSelectedImage] = useState( null )
  const [isSharing, setIsSharing]         = useState( false )

  const pickImage = async () => {
    const result = await launchImageLibraryAsync( {
      mediaTypes   : "images",
      allowsEditing: true,
      aspect       : [1, 1],
      quality      : 0.8
    } )
    if ( !result.canceled ) {
      setSelectedImage( result.assets[0].uri )
    }
  }

  const generateUploadUrl = useMutation( api.posts.generateUploadUrl )
  const createPost        = useMutation( api.posts.createPost )

  const reset = () => {
    setSelectedImage( null )
    setCaption( "" )
  }

  const handleShare       = async () => {
    if ( !selectedImage ) {
      return
    }
    try {
      setIsSharing( true )
      const uploadUrl    = await generateUploadUrl()
      const uploadResult = await uploadAsync( uploadUrl, selectedImage, {
        httpMethod: "POST",
        uploadType: FileSystemUploadType.BINARY_CONTENT,
        mimeType  : "image/jpeg"
      } )

      if ( uploadResult.status !== 200 ) {
        throw new Error( "Upload failed" )
      }
      const { storageId } = JSON.parse( uploadResult.body )
      await createPost( { storageId, caption } )
      reset()
      router.push( "/(tabs)" )
    }
    catch ( e ) {
      console.log( "Error uploading image:", e )
    }
    finally {
      setIsSharing(false)
    }
  }

  if ( !selectedImage ) {
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Pressable>
            <Ionicons name="arrow-back" size={ 28 } color={ COLORS.primary }/>
          </Pressable>
          <Text style={ styles.headerTitle }>New Post</Text>
          <View style={ { width: 28 } }/>
        </View>
        <Pressable style={ styles.emptyImageContainer } onPress={ pickImage }>
          <Ionicons name="image-outline" size={ 48 } color={ COLORS.grey }/>
          <Text style={ styles.emptyImageText }>Tap to select an image</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={ Platform.OS === "ios" ? "padding" : "height" }
      style={ styles.container }
      keyboardVerticalOffset={ Platform.OS === "ios" ? 100 : 0 }
    >
      <View style={ styles.contentContainer }>
        {/*Header*/ }
        <View style={ styles.header }>
          <Pressable onPress={ reset }
                     disabled={ isSharing }>
            <Ionicons name="close-outline"
                      size={ 28 }
                      color={ isSharing ? COLORS.grey : COLORS.white }
            />
          </Pressable>
          <Text style={ styles.headerTitle }>New Post</Text>
          <Pressable
            style={ [
              styles.shareButton, isSharing ? styles.shareButtonDisabled : {}
            ] }
            disabled={ isSharing || !selectedImage }
            onPress={ handleShare }
          >
            { isSharing ?
              <ActivityIndicator size="small" color={ COLORS.primary }/>
              : <Text style={ styles.shareText }>Share</Text>
            }
          </Pressable>
        </View>

          <View style={ [
            styles.content, isSharing ? styles.contentDisabled : {}
          ] }>
            {/*ImageSection*/ }
            <View style={ styles.imageSection }>
              <Image source={ selectedImage }
                     style={ styles.previewImage }
                     contentFit="cover"
                     transition={ 200 }
              />
              <Pressable
                style={ styles.changeImageButton }
                onPress={ pickImage }
                disabled={ isSharing }
              >
                <Ionicons name="image-outline" size={ 20 }
                          color={ COLORS.white }/>
                <Text style={ styles.changeImageText }>Change</Text>
              </Pressable>
            </View>
            {/*Input*/ }
            <View style={ styles.inputSection }>
              <View style={ styles.captionContainer }>
                <Image source={ user?.imageUrl } style={ styles.userAvatar }
                       contentFit="cover" transition={ 200 }/>
                <TextInput
                  showSoftInputOnFocus={true}
                  style={ styles.captionInput }
                  placeholder="Write a caption..."
                  placeholderTextColor={ COLORS.grey }
                  multiline
                  value={ caption }
                  onChangeText={setCaption}
                  editable={ !isSharing }
                />
              </View>
            </View>
          </View>
      </View>
    </KeyboardAvoidingView>
  )
}
