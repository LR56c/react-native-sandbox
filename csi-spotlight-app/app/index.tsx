import { Redirect }              from "expo-router"
import { Pressable, Text, View } from "react-native"
import { useAuth }               from "@clerk/clerk-expo"

export default function Index() {
  // return ( <Redirect href="/(tabs)"/>)
  return ( <Redirect href="/(auth)/login"/>)
}
