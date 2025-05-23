import { Text, View } from "react-native"
import { Tabs }       from "expo-router"
import { Ionicons }   from "@expo/vector-icons"
import { COLORS }     from "@/constants/theme"

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth : 0,
          position       : "absolute",
          elevation      : 0,
          height         : 50,
          paddingBottom  : 8,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({size,color})=> (<Ionicons size={size} color={color} name="home"/>),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          tabBarIcon: ({size,color})=> (<Ionicons size={size} color={color} name="bookmarks"/>),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({size,color})=> (<Ionicons size={size} color={COLORS.primary} name="add-circle"/>),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({size,color})=> (<Ionicons size={size} color={color} name="heart"/>),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({size,color})=> (<Ionicons size={size} color={color} name="person-circle"/>),
        }}
      />
    </Tabs>
  )
}
