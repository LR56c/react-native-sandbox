import { ActivityIndicator, Pressable, Text } from "react-native"
import { ComponentPropsWithoutRef }           from "react"
import { cn }                                 from "@/shared/cn"

interface ButtonProps extends ComponentPropsWithoutRef<typeof Pressable> {
  title: string
  loading: boolean
  onPress?: () => void
  icon?: any
}

export default function Button( {
  title,
  onPress,
  icon,
  loading,
  ...props
}: ButtonProps )
{
  return (
    <Pressable onPress={ onPress } className={ cn(
      "bg-primary flex flex-row items-center justify-center gap-4 w-full p-5 rounded-2xl",
      props.className ) }
    disabled={loading}>
      { loading ? <ActivityIndicator color="#ffffff"/> : <>
        { icon }
        <Text className="text-lg text-white">{ title }</Text>
      </>
      }
    </Pressable>
  )
}
