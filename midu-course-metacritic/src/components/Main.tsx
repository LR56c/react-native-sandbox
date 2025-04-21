import { useEffect, useState }                             from "react"
import { getLatestGames }                                  from "@/metacritic"
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native"
import {
  useSafeAreaInsets
}                                                          from "react-native-safe-area-context"
import {
  GameCard
}                                                          from "@/components/GameCard"

export function Main() {
  const [games, setGames] = useState( [] )
  const insets            = useSafeAreaInsets()
  useEffect( () => {
    getLatestGames().then( value => {
      setGames( value )
    } )
  }, [] )

  return (
    <View style={ { paddingTop: insets.top, paddingBottom: insets.bottom } }>
      <SafeAreaView>
        { games.length === 0 ? (
            <ActivityIndicator color={ "#fff" } size={ "large" }/>
          ) :
          (
            <FlatList
              data={ games }
              keyExtractor={ ( game ) => game.id }
              renderItem={ ( { item } ) => (
                <GameCard game={ item }></GameCard>
              ) }
            />
          ) }
      </SafeAreaView>
    </View>
  )
}

