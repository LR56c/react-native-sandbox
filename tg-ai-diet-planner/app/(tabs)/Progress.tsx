import { FlatList, Platform, Text, View }  from "react-native"
import { z }                               from "zod"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { zodResolver }                     from "@hookform/resolvers/zod"
import DateSelectionCard                   from "@/components/DateSelectionCard"
import TodayMealPlan                       from "@/components/TodayMealPlan"
import moment                              from "moment"
import TodayProgress                       from "@/components/TodayProgress"
import GenerateRecipeCard
                                           from "@/components/GenerateRecipeCard"

const schema = z.object( {
  date: z.string( {
    message: "Please select a date"
  } )
} )

export default function Progress() {
  const methods = useForm( {
    resolver     : zodResolver( schema ),
    defaultValues: {
      date: moment().format( "DD/MM/YYYY" )
    }
  } )

  const { setValue, formState: { errors }, control } = methods

  const onSubmit = async ( data ) => {
    console.log( "data", data )
  }

  const d = useWatch( { control, name: "date" } )

  return (
    <FormProvider { ...methods } >
      <FlatList
        data={ [] }
        renderItem={()=>null}
        ListHeaderComponent={
          <View className={ `${ Platform.OS === "ios"
            ? "p-8"
            : "p-4" } flex flex-col gap-4 h-full` }>
            <Text className="text-xl font-bold">Progress</Text>
            <DateSelectionCard name="date"/>
            <TodayMealPlan selectedDate={ d }/>
            <TodayProgress/>
            <GenerateRecipeCard/>
          </View>
        }
      />
    </FormProvider>
  )
}
