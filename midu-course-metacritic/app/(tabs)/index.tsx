import { useEffect, useState }               from "react"
import { getLatestGames }                    from "@/metacritic"
import { ActivityIndicator, FlatList, View } from "react-native"
import { Logo }                              from "@/components/Logo"
import { AnimatedGameCard }                  from "@/components/GameCard"

export default function Index() {
  const [games, setGames] = useState( [] )
  useEffect( () => {
    getLatestGames().then( value => {
      setGames( value )
    } )
  }, [] )

  return (
    <View className="bg-black">
      { games.length === 0 ? (
          <ActivityIndicator color={ "#fff" } size={ "large" }/>
        ) :
        (
          <FlatList
            data={ games }
            keyExtractor={ ( game ) => game.id }
            renderItem={ ( { item, index } ) => (
              <AnimatedGameCard index={ index }
                                game={ item }></AnimatedGameCard>
            ) }
          />
        ) }
    </View>
  )
}
