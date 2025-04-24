import { TextInput } from "react-native"

interface InputProps {
  placeholder: string
  value: string
  onChangeText: ( text: string ) => void
  secureTextEntry?: boolean
}

export default function Input( {
  onChangeText,
  value,
  placeholder,
  secureTextEntry
}: InputProps )
{
  return (
    <TextInput placeholder={ placeholder } value={ value }
               secureTextEntry={secureTextEntry}
               onChangeText={ onChangeText }
               className="w-full border rounded-xl text-xl p-4"/>
  )
}
