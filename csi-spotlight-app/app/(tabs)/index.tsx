import { Image, Pressable, Text, View } from "react-native"
import { useAuth }                      from "@clerk/clerk-expo"

export default function Index() {
  const { signOut } = useAuth()
  return (
    <View
      className="flex-1 items-center justify-center"
    >
      <Text className="text-red-500">Edit app/index.tsx to edit this
        screen.</Text>
      <Image source={ require( "../../assets/images/favicon.png" ) }/>
      <Pressable onPress={ () => signOut() }>
        <Text className="text-black">logout</Text>
      </Pressable>
    </View>
  )
}
