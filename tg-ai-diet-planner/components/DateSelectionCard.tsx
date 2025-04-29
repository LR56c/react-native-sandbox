import { FlatList, Pressable, Text, View } from "react-native"
import { Controller, useFormContext }      from "react-hook-form"
import moment                              from "moment/moment"
import { useEffect, useState }             from "react"

interface DateSelectionCardProps {
  name: string
}

export default function DateSelectionCard( { name }: DateSelectionCardProps ) {
  const [dates, setDates] = useState( [] )
  const generateDates     = () => {
    const result = []
    for ( let i = 0; i < 4; i++ ) {
      const nextDate = moment().add( i, "days" ).format( "DD/MM/YYYY" )
      result.push( nextDate )
    }
    setDates( result )
  }
  useEffect( () => {
    generateDates()
  }, [] )

  const {
          control,
          setValue,
          formState: { errors }
        }            = useFormContext()
  const errorMessage = errors[name]?.message as string | undefined

  return (
    <View className="flex flex-col gap-2">
      <Text className="text-lg font-bold text-center ">Select Date</Text>
      <FlatList numColumns={ 4 } data={ dates } renderItem={ ( { item } ) => (
        <Controller
          control={ control }
          name={ name }
          render={ ( { field: { onChange, onBlur, value } } ) => (
            <Pressable style={ {
              borderColor    : value === item ? "#862afe" : "#6a7282",
              backgroundColor: value === item ? "#fbf5ff" : "#fff"
            } } onPress={ () => setValue( name, item, {
              shouldValidate: true
            } ) }
                       className="flex-1 items-center justify-center border rounded-lg mx-2 p-2">
              <Text className="text-lg font-semibold">{ moment( item,
                "DD/MM/YYYY" ).format( "ddd" ) }</Text>
              <Text className="text-xl font-bold">{ moment( item,
                "DD/MM/YYYY" )
                .format( "DD" ) }</Text>
              <Text className="text-md">{ moment( item, "DD/MM/YYYY" )
                .format( "MMM" ) }</Text>
            </Pressable>
          )
          }
        />
      ) }/>
      { errorMessage
        ? <Text className="text-red-500">{ errorMessage }</Text>
        : null }
    </View>
  )
}
