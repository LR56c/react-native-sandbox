import { Text, TextInput, View }      from "react-native"
import { Controller, useFormContext } from "react-hook-form"
import { ComponentPropsWithoutRef }   from "react"
import { cn }                         from "@/shared/cn"

interface InputProps extends ComponentPropsWithoutRef<typeof TextInput> {
  inputClass?: string
  name: string
  label?: string
  placeholder: string
}

export default function Input( {
  name,
  inputClass,
  label,
  placeholder,
  ...props
}: InputProps )
{
  const {
          control,
          formState: { errors }
        } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <View className={cn('flex gap-2 flex-col w-full rounded-xl', props.className)}>
      { label ? <Text className="text-xl">{ label }</Text> : null }
      <Controller
        control={ control }
        name={ name }
        render={ ( { field: { onChange, onBlur, value } } ) => (
          <TextInput placeholder={ placeholder } value={ value }
                     { ...props }
                     onChangeText={ onChange }
                     onBlur={ onBlur }
                     className={cn('w-full border rounded-xl text-xl p-4', inputClass)}/>
        ) }
      />
      { errorMessage
        ? <Text className="text-red-500">{ errorMessage }</Text>
        : null }
    </View>

  )
}
