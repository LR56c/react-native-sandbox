import { Pressable, Text, View } from "react-native"
import { useState }              from "react"
import { CalendarAdd01Icon }     from "@hugeicons/core-free-icons"
import { HugeiconsIcon }         from "@hugeicons/react-native"

export default function TodayMealPlan() {
  const [mealPlan, setMealPlan] = useState( true )

  return (
    <View className="flex flex-col gap-4">
      <Text className="text-xl font-bold">Today's Meal Plan</Text>
      { mealPlan ?
        <View className="bg-white rounded-xl p-4 flex items-center gap-2">
          <HugeiconsIcon
            icon={ CalendarAdd01Icon }
            size={ 40 }
            color="#862afe"
          />
          <Text className="text-lg text-gray-500">You don't have any meal plan
            for today</Text>
          <Pressable className="py-2 px-4 rounded-2xl bg-primary">
            <Text className="text-white text-lg text-center">Create new meal
              plan</Text>
          </Pressable>
        </View> : null
      }
    </View>
  )
}
