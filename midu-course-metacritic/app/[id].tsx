import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"
import { Stack, useLocalSearchParams }                      from "expo-router"
import { Screen }                                    from "@/components/Screen"
import { useEffect, useState }                       from "react"
import { getGameDetails }                            from "@/metacritic"
import { Score }                                     from "@/components/Score"

export default function Detail() {
  const { id }                  = useLocalSearchParams()
  const [gameInfo, setGameInfo] = useState( null )

  useEffect( () => {
    if ( id ) {
      getGameDetails( id ).then( setGameInfo )
    }
  }, [id] )

  return (
    <Screen>
      <Stack.Screen
        options={ {
          headerStyle    : { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerLeft     : () => {
          },
          headerTitle    : "The Legend of Zelda: Breath of the Wild",
          headerRight    : () => {
          }
        } }
      />
      <View>
        { gameInfo === null ? (
          <ActivityIndicator color={ "#fff" } size={ "large" }/>
        ) : (
          <ScrollView>
            <View className="justify-center items-center text-center">
              <Image
                className="mb-4 rounded"
                source={ { uri: gameInfo.thumbnail } }
                style={ { width: 214, height: 294 } }
              />
              <Score score={ gameInfo.short_description.length } maxScore={ 100 }/>
              <Text className="text-white text-center font-bold text-xl">
                { gameInfo.title }
              </Text>
              <Text className="text-white/70 mt-4 text-left mb-8 text-base">
                { gameInfo.short_description }
              </Text>
            </View>
          </ScrollView>
        ) }
      </View>
    </Screen>
  )
}
