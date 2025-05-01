import "./../global.css"
import { StatusBar }                      from "expo-status-bar"
import { ClerkProvider, useAuth }         from "@clerk/clerk-expo"
import { tokenCache }                     from "@clerk/clerk-expo/token-cache"
import InitialLayout                      from "@/components/InitialLayout"
import { ConvexProviderWithClerk }        from "convex/react-clerk"
import { ConvexReactClient }              from "convex/react"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const convex = new ConvexReactClient( process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false
} )
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={ tokenCache }>
      <ConvexProviderWithClerk client={ convex } useAuth={ useAuth }>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1, backgroundColor: "black"}}>
            <StatusBar backgroundColor="black" style="light"/>
            <InitialLayout/>
          </SafeAreaView>
        </SafeAreaProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
