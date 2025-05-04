import {
  ActivityIndicator,
  KeyboardAvoidingView, Platform,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native"
import { useState } from "react"
import styles       from "@/assets/styles/login.styles"
import { Image }    from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import COLORS       from "../../constants/colors"
import { Link }     from "expo-router"

export default function Index() {
  const [email, setEmail]               = useState( "" )
  const [password, setPassword]         = useState( "" )
  const [showPassword, setShowPassword] = useState( false )
  const [isLoading, setIsLoading]       = useState( false )

  const handleLogin = () => {
  }
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={ Platform.OS === "ios" ? "padding" : "height" }
    >
      <View style={ styles.container }>
        <View style={ styles.topIllustration }>
          <Image
            source={ require( "@/assets/images/Reading glasses-bro.png" ) }
            style={ styles.illustrationImage }
            contentFit="contain"
          />
        </View>
        <View style={ styles.card }>
          <View style={ styles.formContainer }>
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
            <Pressable style={ styles.button } onPress={ handleLogin }
                       disabled={ isLoading }>
              { isLoading ? (
                <ActivityIndicator color="#fff"/>
              ) : (
                <Text style={ styles.buttonText }>Login</Text>
              ) }

            </Pressable>
            <View style={ styles.footer }>
              <Text style={ styles.footerText }>Don't have an account?</Text>
              <Link href="/signup" asChild>
                <Pressable>
                  <Text style={ styles.link }>Sign up</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
