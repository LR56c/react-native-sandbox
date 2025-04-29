import { Text, View }   from "react-native"
import moment           from "moment"
import { useUserStore } from "@/store/useUser"
import { useConvex }    from "convex/react"
import { api }                 from "@/convex/_generated/api"
import { useEffect, useState } from "react"
import { useAppDataStore } from "@/store/useAppData"

export default function TodayProgress() {
  const user                     = useUserStore( ( state ) => state.user )
  const setData      = useAppDataStore( ( state ) => state.setData )
  const data      = useAppDataStore( ( state ) => state.data )
  const convex                   = useConvex()
  useEffect( () => {
    if(user){
    GetTotalCaloriesConsumed()
    }
  }, [] )

  const GetTotalCaloriesConsumed= async ()=> {
    const result = await convex.query(
      api.mealPlan.GetTotalCaloriesConsumed, {
        userId: user?.id ?? "",
        date  : moment().format( "DD/MM/YYYY" )
      } )
    setData({
      totalCalories: result
    })
  }
  return (
    <View className="bg-white rounded p-4 flex flex-col">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-bold">Today's Goal</Text>
        <Text>{ moment().format( "MMM DD, yyyy" ) }</Text>
      </View>
      <Text
        className="text-center font-bold text-3xl text-primary mt-4">{data?.totalCalories ?? 0}/{ user?.calories } kcal</Text>
      <Text className="text-center text-lg">You're doing great!</Text>
      <View className="bg-gray-400/70 w-full h-3 mt-4 rounded-full">
        <View style={ { width: "70%" } }
              className="bg-primary h-3 rounded-full">
        </View>
      </View>
      <View className="flex flex-row justify-between mt-2">
        <Text>Calories Consumes</Text>
        <Text>Keep it up!🔥</Text>
      </View>
    </View>
  )
}
