import { FlatList, Pressable, Text, View } from "react-native"
import { useEffect, useState }             from "react"
import { CalendarAdd01Icon }     from "@hugeicons/core-free-icons"
import { HugeiconsIcon }         from "@hugeicons/react-native"
import { useConvex }             from "convex/react"
import { api }                   from "@/convex/_generated/api"
import { useUserStore }          from "@/store/useUser"
import moment                    from "moment"
import { TodayMeal }             from "@/shared/mealPlan"
import MealPlanCard                        from "@/components/MealPlanCard"
import { useAppDataStore }                 from "@/store/useAppData"

interface TodayMealPlanProps {
  selectedDate ?: string
}

export default function TodayMealPlan({selectedDate = null} : TodayMealPlanProps) {
  const [mealPlan, setMealPlan] = useState<TodayMeal[]>([]  )
  const convex                  = useConvex()
  const user                    = useUserStore( ( state ) => state.user )
  const data      = useAppDataStore( ( state ) => state.data )

  useEffect( () => {
    if(user){
      GetTodayMealPlan()
    }
  }, [user, selectedDate] )
  const GetTodayMealPlan = async () => {
    const result = await convex.query( api.mealPlan.GetTodaysMealPlan, {
      userId: user?.id,
      date  : selectedDate ? selectedDate : moment().format( "DD/MM/YYYY" )
    } )
    setMealPlan( result )
  }

  return (
    <View className="flex flex-col gap-4">
      { !selectedDate ? <Text className="text-xl font-bold">Today's Meal Plan</Text> : null}
      { !mealPlan.length ?
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
        </View> : <View>
          <FlatList
            data={mealPlan}
            renderItem={({item})=>(
              <MealPlanCard meal={item}/>
            )}
          />
        </View>
      }
    </View>
  )
}
