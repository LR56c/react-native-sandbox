import { Pressable, Text, View } from "react-native"
import { ComponentPropsWithoutRef } from "react"

interface GoalButtonProps extends ComponentPropsWithoutRef<typeof Pressable>{
  onPress?: () => void
  icon?: any
  title?: string
  description?: string
}

export default function GoalButton( {
  description,
  title,
  onPress,
  icon,
  ...props
}: GoalButtonProps )
{
  console.log("GoalButton rerender")
  return (
    <Pressable
      {...props}
      onPress={ onPress }
      className="border border-gray-500 rounded-xl p-4 flex flex-row items-center gap-4">
      { icon }
      <View>
        <Text className="text-lg font-bold">{ title }</Text>
        <Text>{ description }</Text>
      </View>
    </Pressable>
  )
}
