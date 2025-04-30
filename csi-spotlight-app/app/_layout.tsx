import "./../global.css"
import { StatusBar }              from "expo-status-bar"
import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
import { tokenCache }             from "@clerk/clerk-expo/token-cache"
import InitialLayout               from "@/components/InitialLayout"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!,{
  unsavedChangesWarning: false,
});
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={ tokenCache }>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <StatusBar backgroundColor="black" style="light"/>
        <InitialLayout/>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
