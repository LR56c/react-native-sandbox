import { Image, Pressable, Text, View } from "react-native"
import Input                            from "@/components/Input"
import Button                           from "@/components/Button"
import { Link }                         from "expo-router"

export default function SignIn() {
  const onSignIn = () => {}

  return (
    <View className="flex-1 items-center p-4 gap-4">
      <Image className="w-20 h-20 mt-20"
             source={ require( "./../../assets/images/food_logo.png" ) }/>
      <Text className="text-2xl font-bold">Welcome Back</Text>
      <Input placeholder="Email"/>
      <Input placeholder="Password" secureTextEntry/>
      <Button title="Sign In"/>
      <View className="flex gap-2 items-center">
        <Text>Don't have an Account?</Text>
        <Link href="/auth/SignUp">
          <Text className="text-center text-lg font-bold">Create New
            Account </Text>
        </Link>
      </View>
    </View>
  )
}
