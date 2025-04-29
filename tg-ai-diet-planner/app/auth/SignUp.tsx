import { Image, Text, View }              from "react-native"
import Input                              from "@/components/Input"
import Button                             from "@/components/Button"
import { Link }                           from "expo-router"
import { z }                              from "zod"
import { zodResolver }                    from "@hookform/resolvers/zod"
import { FormProvider, useForm }          from "react-hook-form"
import { useMutation }                    from "convex/react"
import { api }                            from "@/convex/_generated/api"
import { createUserWithEmailAndPassword } from "@firebase/auth"
import { auth }                           from "@/firebase"
import { useUserStore }                   from "@/store/useUser"

const schema = z.object( {
  name    : z.string()
             .min( 2, { message: "Name must be at least 2 characters long" } ),
  email   : z.string().email( { message: "Invalid email address" } ),
  password: z.string()
             .min( 6,
               { message: "Password must be at least 6 characters long" } )
} )


export default function SignUp() {
  const methods       = useForm( {
    resolver: zodResolver( schema )
  } )
  const createNewUser = useMutation( api.users.CreateNewUser )
  const setUser = useUserStore((state) => state.setUser);
  const onSubmit      = async ( data ) => {
    const r      = await createUserWithEmailAndPassword( auth, data.email,
      data.password )
    const result = await createNewUser( {
      email: data.email,
      name : data.name
    } )
    setUser({
      name: data.name,
      email: data.email,
    })
  }

  return (
    <FormProvider { ...methods } >
      <View className="flex-1 items-center p-4 gap-4">
        <Image className="w-20 h-20 mt-20"
               source={ require( "./../../assets/images/food_logo.png" ) }/>
        <Text className="text-2xl font-bold">Create New Account</Text>
        <Input name="name" placeholder="Full Name"/>
        <Input name="email" placeholder="Email"/>
        <Input name="password" placeholder="Password" secureTextEntry/>
        <Button onPress={ methods.handleSubmit( onSubmit ) }
                title="Create Account"/>
        <View className="flex gap-2 items-center">
          <Text>Already have an account?</Text>
          <Link href="/auth/SignIn">
            <Text className="text-center text-lg font-bold">Sign In Here</Text>
          </Link>
        </View>
      </View>
    </FormProvider>
  )
}
