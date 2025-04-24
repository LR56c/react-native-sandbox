import { Image, Text, TextInput, View } from "react-native"
import Input                            from "@/components/Input"
import Button                from "@/components/Button"
import { Link }              from "expo-router"
import { useState }          from "react"
import { z }                 from "zod"
import { zodResolver }         from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

const schema = z.object( {
  name : z
    .string()
    .min( 2, { message: "Name must be at least 2 characters long" } ),
} )


export default function SignUp() {
  const [name, setName]         = useState( "" )
  const [email, setEmail]       = useState( "" )
  const [password, setPassword] = useState( "" )
  const onSignUp                = () => {
    console.log( "Sign Up", { name, email, password } )
  }
  const {
          control,
          handleSubmit,
          formState: { errors }
        }                       = useForm( {
    resolver: zodResolver( schema )
  } )

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View className="flex-1 items-center p-4 gap-4">
      <Image className="w-20 h-20 mt-20"
             source={ require( "./../../assets/images/food_logo.png" ) }/>
      <Text className="text-2xl font-bold">Create New Account</Text>
      <Text>Name</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="h-16 border border-gray-500 px-4"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your name"
          />
        )}
      />
      {errors.name && <Text className="text-red-400">{errors.name.message}</Text>}
      <Input onChangeText={ setName } placeholder="Full Name"/>
      <Input onChangeText={ setEmail } placeholder="Email"/>
      <Input onChangeText={ setPassword } placeholder="Password" secureTextEntry/>
      <Button onPress={ handleSubmit(onSubmit) } title="Create Account"/>
      <View className="flex gap-2 items-center">
        <Text>Already have an account?</Text>
        <Link href="/auth/SignIn">
          <Text className="text-center text-lg font-bold">Sign In Here</Text>
        </Link>
      </View>
    </View>
  )
}
