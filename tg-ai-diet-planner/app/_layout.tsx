import { Stack }                             from "expo-router"
import "../global.css"
import { setStatusBarStyle }                 from "expo-status-bar"
import { ConvexProvider, ConvexReactClient } from "convex/react"

export default function RootLayout() {
const convex = new ConvexReactClient( process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false
} )
  setStatusBarStyle( "dark" )
  return (
    <ConvexProvider client={ convex }>
      <Stack screenOptions={ { headerShown: false } }>
        <Stack.Screen name="index"/>
      </Stack>
    </ConvexProvider>
  )
}
