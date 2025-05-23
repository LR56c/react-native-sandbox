import "./../global.css"
import { StatusBar }                      from "expo-status-bar"
import { ClerkProvider, useAuth }         from "@clerk/clerk-expo"
import { tokenCache }                     from "@clerk/clerk-expo/token-cache"
import InitialLayout                      from "@/components/InitialLayout"
import { ConvexProviderWithClerk }        from "convex/react-clerk"
import { ConvexReactClient }              from "convex/react"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { SplashScreen }                   from "expo-router"
import { useFonts }                       from "expo-font"
import { useCallback, useEffect }         from "react"
import * as NavigationBar                 from "expo-navigation-bar"
import { Platform }                       from "react-native"

const convex = new ConvexReactClient( process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false
} )
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts( {
    "JetBrainsMono-Medium": require(
      "./../assets/fonts/JetBrainsMono-Medium.ttf" )
  } )

  useEffect( () => {
    if ( Platform.OS === "android" ) {
      NavigationBar.setBackgroundColorAsync( "black" )
      NavigationBar.setButtonStyleAsync( "light" )
    }
  }, [] )

  const onLayoutRootView = useCallback( async () => {
    if ( !fontsLoaded ) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded] )
  return (
    <ClerkProvider tokenCache={ tokenCache }>
      <ConvexProviderWithClerk client={ convex } useAuth={ useAuth }>
        <SafeAreaProvider>
          <SafeAreaView style={ { flex: 1, backgroundColor: "black" } }
                        onLayout={ onLayoutRootView }>
            <InitialLayout/>
          </SafeAreaView>
          <StatusBar backgroundColor="black" style="light"/>
        </SafeAreaProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
