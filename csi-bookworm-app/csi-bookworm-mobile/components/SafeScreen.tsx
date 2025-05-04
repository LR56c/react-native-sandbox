import { Text, View } from "react-native"
import { Stack }      from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function SafeScreen({children}) {
  const insets = useSafeAreaInsets()
  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: "#fff"
    }}>
      {children}
    </View>
  )
}
