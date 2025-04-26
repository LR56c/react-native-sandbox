import { Alert, Image, Text, View } from "react-native"
import Button                       from "@/components/Button"
import { Link }                  from "expo-router"
import { zodResolver }           from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { z }                          from "zod"
import Input                          from "@/components/Input"
import { signInWithEmailAndPassword } from "@firebase/auth"
import { auth }                       from "@/firebase"
import { useConvex }                  from "convex/react"
import { api }                        from "@/convex/_generated/api"
import { useUserStore }               from "@/store/useUser"

const schema = z.object( {
  email   : z.string().email( { message: "Invalid email address" } ),
  password: z.string()
} )

export default function SignIn() {
  const methods = useForm( {
    resolver: zodResolver( schema )
  } )
  const setUser = useUserStore( ( state ) => state.setUser )
  const convex  = useConvex()

  const onSubmit = async ( data ) => {
    console.log( "onSubmit", data )
    signInWithEmailAndPassword( auth, data.email, data.password ).then(
      async ( userCredential ) => {
        const user = await convex.query( api.users.GetUser,
          { email: data.email } )
        setUser( {
          name : data.name,
          email: data.email
        } )
      }
    ).catch( ( error ) => {
        Alert.alert( "Incorrect credencials", "Please check your email and password")
      }
    )
  }

  return (
    <FormProvider { ...methods } >
      <View className="flex-1 items-center p-4 gap-4">
        <Image className="w-20 h-20 mt-20"
               source={ require( "./../../assets/images/food_logo.png" ) }/>
        <Text className="text-2xl font-bold">Welcome Back</Text>
        <Input name="email" placeholder="Email"/>
        <Input name="password" placeholder="Password" secureTextEntry/>
        <Button onPress={ methods.handleSubmit( onSubmit ) } title="Sign In"/>
        <View className="flex gap-2 items-center">
          <Text>Don't have an Account?</Text>
          <Link href="/auth/SignUp">
            <Text className="text-center text-lg font-bold">Create New
              Account </Text>
          </Link>
        </View>
      </View>
    </FormProvider>
  )
}
