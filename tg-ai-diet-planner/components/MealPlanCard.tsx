import { Alert, Image, Text, View } from "react-native"
import { TodayMeal }                from "@/shared/mealPlan"
import BouncyCheckbox               from "react-native-bouncy-checkbox"
import { useMutation }              from "convex/react"
import { api }                      from "@/convex/_generated/api"
import { useAppDataStore }          from "@/store/useAppData"
import { useUserStore }             from "@/store/useUser"

interface MealPlanCardProps {
  meal: TodayMeal
}

    const clamp = ( num: number, min: number, max: number ) => {
      return Math.max( min, Math.min( num, max ) )
    }
export default function MealPlanCard( {
  meal
}: MealPlanCardProps )
{
  const setData      = useAppDataStore( ( state ) => state.setData )
  const user                     = useUserStore( ( state ) => state.user )
  const data         = useAppDataStore( ( state ) => state.data )
  const UpdateStatus = useMutation( api.mealPlan.UpdateStatus )
  const onCheck      = async ( isChecked: boolean ) => {
    const result = await UpdateStatus( {
      id      : meal.mealPlan._id,
      status  : isChecked,
      calories: Number( meal.recipe.data.calories )
    } )

    const calorieChange = isChecked
      ? Number( meal.recipe.data.calories )
      : -Number( meal.recipe.data.calories )

    const clampedValue = clamp( (
      data?.totalCalories ?? 0
    ) + calorieChange, 0, Number(user?.calories) ?? 0 )

    setData( {
      totalCalories: clampedValue
    } )
    Alert.alert( "Success", "Meal plan updated successfully" )
  }

  return (
    <View
      className="flex-1 flex-row gap-4 bg-white justify-between items-center p-4 rounded-lg mb-4">
      <Image className="h-20 w-20 rounded-lg" source={ {
        uri: meal.recipe.imageUrl
      } }/>
      <View className="flex flex-col justify-between">
        <Text className="text-primary">{ meal.mealPlan.mealType }</Text>
        <Text className="text-lg font-bold">{ meal.recipe.recipeName }</Text>
        <Text
          className="text-md font-semibold">{ meal.recipe.data.calories } kcal</Text>
      </View>
      <View>
        <BouncyCheckbox
          isChecked={ meal.mealPlan.status }
          onPress={ ( isChecked: boolean ) => onCheck( isChecked ) }/>
      </View>
    </View>
  )
}
