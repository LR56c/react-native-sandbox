import { Text, View } from "react-native"

interface RecipeInfoProps {
  label: string
  value: string
  icon: any
}

export default function RecipeInfo( { label, icon, value }: RecipeInfoProps ) {
  return (
    <View className="w-32 h-28 flex flex-col items-center justify-center gap-1 bg-primary/10 p-4 rounded-2xl">
      { icon }
      <Text>{ label }</Text>
      <Text
        className="text-primary font-bold text-lg">{ value }</Text>
    </View>
  )
}
