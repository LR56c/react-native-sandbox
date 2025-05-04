import {
  ActivityIndicator, Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native"
import styles        from "../../assets/styles/signup.styles"
import { Ionicons }  from "@expo/vector-icons"
import COLORS        from "@/constants/colors"
import { useState }  from "react"
import { useRouter } from "expo-router"
import { useAuthStore } from "@/store/auth.store"

export default function Signup() {
  const router                          = useRouter()
  const [username, setUsername]         = useState( "" )
  const [email, setEmail]               = useState( "" )
  const [password, setPassword]         = useState( "" )
  const [showPassword, setShowPassword] = useState( false )
  const [isLoading, setIsLoading]       = useState( false )

  const register        = useAuthStore( ( state ) => state.register )

  const handleSigup = async () => {
    const result = await register( { username, email, password } )

    if(!result){
      Alert.alert( "Error", "Something went wrong" )
    }
  }

  return (
    <KeyboardAvoidingView
      style={ { flex: 1 } }
      keyboardVerticalOffset={ Platform.OS === "ios" ? 100 : 0 }>
      <View style={ styles.container }>
        <View style={ styles.card }>
          <View style={ styles.header }>
            <Text style={ styles.title }>BookWorm</Text>
            <Text style={ styles.subtitle }>Share your favorite reads</Text>
          </View>
          <View style={ styles.formContainer }>
            <View style={ styles.inputGroup }>
              <Text style={ styles.label }>Username</Text>
              <View style={ styles.inputContainer }>
                <Ionicons name="person-outline" size={ 20 }
                          style={ styles.inputIcon }
                          color={ COLORS.primary }/>
                <TextInput style={ styles.input }
                           value={ username }
                           onChangeText={ setUsername }
                />
              </View>
            </View>
            <View style={ styles.inputGroup }>
              <Text style={ styles.label }>Email</Text>
              <View style={ styles.inputContainer }>
                <Ionicons name="mail-outline" size={ 20 }
                          style={ styles.inputIcon }
                          color={ COLORS.primary }/>
                <TextInput style={ styles.input } placeholder="Enter your email"
                           placeholderTextColor={ COLORS.placeholderText }
                           value={ email }
                           onChangeText={ setEmail }
                           keyboardType="email-address"
                           autoCapitalize="none"
                />
              </View>
            </View>
            <View style={ styles.inputGroup }>
              <Text style={ styles.label }>Password</Text>
              <View style={ styles.inputContainer }>
                <Ionicons name="lock-closed-outline" size={ 20 }
                          style={ styles.inputIcon }
                          color={ COLORS.primary }/>
                <TextInput style={ styles.input }
                           placeholder="Enter your password"
                           placeholderTextColor={ COLORS.placeholderText }
                           value={ password }
                           onChangeText={ setPassword }
                           secureTextEntry={ !showPassword }
                />
                <Pressable
                  onPress={ () => setShowPassword( !showPassword ) }
                  style={ styles.eyeIcon }>
                  <Ionicons
                    name={ showPassword ? "eye-off-outline" : "eye-outline" }
                    size={ 20 }
                    color={ COLORS.primary }/>
                </Pressable>
              </View>
            </View>
            <Pressable style={ styles.button } onPress={ handleSigup }
                       disabled={ isLoading }>
              { isLoading ? (
                <ActivityIndicator color="#fff"/>
              ) : (
                <Text style={ styles.buttonText }>Sign Up</Text>
              ) }

            </Pressable>
            <View style={ styles.footer }>
              <Text style={ styles.footerText }>Already have an account?</Text>
              <Pressable onPress={ () => router.back() }>
                <Text style={ styles.link }>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
