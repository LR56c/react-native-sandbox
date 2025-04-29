import { Alert, FlatList, Pressable, Text, View } from "react-native"
import { RecipeDetail }                           from "@/shared/recipe"
import {
  Coffee02Icon,
  Moon02Icon,
  Sun03Icon
}                                                 from "@hugeicons/core-free-icons"
import Button                                     from "@/components/Button"
import { HugeiconsIcon }                          from "@hugeicons/react-native"
import { Controller, FormProvider, useForm }      from "react-hook-form"
import { zodResolver }                            from "@hookform/resolvers/zod"
import { z }                                      from "zod"
import { useUserStore }                           from "@/store/useUser"
import { useMutation }                            from "convex/react"
import { api }                                    from "@/convex/_generated/api"
import DateSelectionCard
                                                  from "@/components/DateSelectionCard"

interface AddToMealActionSheetProps {
  recipeDetail: RecipeDetail
  hideActionSheet: () => void
}

const schema = z.object( {
  date: z.string( {
    message: "Please select a date"
  } ),
  meal: z.enum( ["Breakfast", "Lunch", "Dinner"], {
    message: "Please select a meal"
  } )
} )

export default function AddToMealActionSheet( {
  recipeDetail,
  hideActionSheet
}: AddToMealActionSheetProps )
{
  const mealOptions = [
    {
      title: "Breakfast",
      icon : Coffee02Icon
    },
    {
      title: "Lunch",
      icon : Sun03Icon
    },
    {
      title: "Dinner",
      icon : Moon02Icon
    }
  ]

  const methods = useForm( {
    resolver: zodResolver( schema )
  } )

  const { setValue, formState: { errors }, control } = methods
  const user                                         = useUserStore(
    ( state ) => state.user )
  const CreateMealPlan                               = useMutation(
    api.mealPlan.CreateMealPlan )

  const onSubmit = async ( data ) => {
    const result = await CreateMealPlan( {
      userId  : user?.id,
      recipeId: recipeDetail._id,
      date    : data.date,
      mealType: data.meal
    } )
    Alert.alert( "Success", "Recipe added to meal plan" )
    hideActionSheet()
  }

  return (
    <FormProvider { ...methods } >
      <View className="flex flex-col gap-4 p-4">
        <Text className="text-lg font-bold text-center ">Add to meal</Text>
        <DateSelectionCard name="date"/>
        <Text className="text-lg font-bold text-center ">Select Meal</Text>
        <FlatList numColumns={ 3 } data={ mealOptions }
                  renderItem={ ( { item } ) => (
                    <Controller
                      control={ control }
                      name="meal"
                      render={ ( { field: { onChange, onBlur, value } } ) => (
                        <Pressable style={ {
                          borderColor    : value === item.title
                            ? "#862afe"
                            : "#6a7282",
                          backgroundColor: value === item.title
                            ? "#fbf5ff"
                            : "#fff"
                        } } onPress={ () => setValue( "meal", item.title, {
                          shouldValidate: true
                        } ) }
                                   className="flex-1 items-center justify-center border rounded-lg mx-2 p-2">
                          <HugeiconsIcon icon={ item.icon }/>
                          <Text className="font-bold">{ item.title }</Text>

                        </Pressable>
                      )
                      }
                    />

                  ) }/>
        { errors.meal ? <Text
          className="text-red-500">{ errors.meal.message }</Text> : null }
        <View className="flex gap-4">
          <Button title="+ Add to Meal Plan"
                  loading={ false }
                  onPress={ methods.handleSubmit( onSubmit ) }/>
          <Pressable onPress={ () => hideActionSheet() } className="p-4">
            <Text className="text-center text-lg">Cancel</Text>
          </Pressable>
        </View>

      </View>
    </FormProvider>
  )
}
