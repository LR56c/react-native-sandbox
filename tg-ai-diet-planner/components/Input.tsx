import { Text, TextInput, View }      from "react-native"
import { Controller, useFormContext } from "react-hook-form"

interface InputProps {
  name: string
  placeholder: string
  secureTextEntry?: boolean
}

export default function Input( {
  name,
  placeholder,
  secureTextEntry
}: InputProps )
{
  const {
          control,
          formState: { errors }
        } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <View className="flex flex-col w-full">
      <Controller
        control={ control }
        name={ name }
        render={ ( { field: { onChange, onBlur, value } } ) => (
          <TextInput placeholder={ placeholder } value={ value }
                     secureTextEntry={ secureTextEntry }
                     onChangeText={ onChange }
                     onBlur={onBlur}
                     className="w-full border rounded-xl text-xl p-4"/>
        ) }
      />
      { errorMessage ? <Text className="text-red-500">{ errorMessage }</Text> : null }
    </View>

  )
}
