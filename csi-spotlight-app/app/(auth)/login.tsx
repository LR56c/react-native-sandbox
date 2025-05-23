import { Image, Pressable, Text, View } from "react-native"
import { styles }                       from "@/styles/auth.styles"
import { Ionicons }          from "@expo/vector-icons"
import { COLORS }            from "@/constants/theme"
import { useSSO }                       from "@clerk/clerk-expo"
import { useRouter }                    from "expo-router"

export default function Login() {
  const {startSSOFlow} = useSSO()
  const router = useRouter()
  const handleGoogleSignIn = async () => {
    try{
      const {createdSessionId, setActive} =await startSSOFlow({strategy:'oauth_google'})
      if ( setActive && createdSessionId ){
        await setActive( {session: createdSessionId } )
        router.replace( "/(tabs)" )
      }
    }
    catch ( e ){
      console.log("Error during Google sign-in:", e)
    }
  }
  return (
    <View style={ styles.container }>
      <View style={ styles.brandSection }>
        <View style={ styles.logoContainer }>
          <Ionicons name="leaf" size={ 32 } color={ COLORS.primary }/>
        </View>
        <Text style={ styles.appName }>spotlight</Text>
        <Text style={ styles.tagline }>don't miss anything</Text>
      </View>
      <View style={ styles.illustrationContainer }>
        <Image style={ styles.illustration }
               source={ require( "../../assets/images/Online wishes-bro.png" ) }
               resizeMode="cover"/>
      </View>

      <View style={styles.loginSection}>
        <Pressable style={styles.googleButton} onPress={handleGoogleSignIn}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface}/>
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  )
}
