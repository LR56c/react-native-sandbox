import { Pressable, Text } from "react-native"

interface ButtonProps {
  title: string
  onPress?: () => void
  icon? : any
}

export default function Button( { title, onPress,icon }: ButtonProps ) {
  return (
    <Pressable onPress={onPress} className="bg-primary flex flex-row items-center justify-center gap-4 w-full p-5 rounded-2xl">
      {icon}
      <Text className="text-lg text-white">{title}</Text>
    </Pressable>
  )
}
