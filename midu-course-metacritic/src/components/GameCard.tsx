import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
}                            from "react-native"
import { useEffect, useRef } from "react"
import { Score }             from "@/components/Score"
import { Link }              from "expo-router"
import { styled }            from "nativewind"

const StyledPressable = styled( Pressable )

export function GameCard( { game } ) {
  const randomScore = Math.floor( Math.random() * (
    100 - 60 + 1
  ) + 60 )
  return (
    <Link href={ `/${ game.id }` } asChild>
      <StyledPressable
        className="active:opacity-70 border border-black active:border-white/50 mb-2 bg-slate-200/10 p-4 rounded-xl">
        <View className="flex-row gap-4" key={ game.id }>
          <Image source={ { uri: game.thumbnail } } style={ styles.image }/>
          <View className="flex-shrink">
            <Text style={ styles.title }>{ game.title }</Text>
            <Score score={ game.short_description.length } maxScore={ 100 }/>
            <Text
              style={ styles.description }>{ game.short_description }</Text>
          </View>
        </View>
      </StyledPressable>
    </Link>
  )
}

export function AnimatedGameCard( { game, index } ) {
  const opacity = useRef( new Animated.Value( 0 ) ).current

  useEffect( () => {
    Animated.timing( opacity, {
      toValue        : 1,
      duration       : 250,
      delay          : index * 250,
      useNativeDriver: true
    } ).start()
  }, [opacity, index] )

  return (
    <Animated.View style={ { opacity } }>
      <GameCard game={ game }/>
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  card       : {
    marginBottom: 42
  },
  image      : {
    width       : 107,
    height      : 147,
    borderRadius: 10
  },
  title      : {
    fontSize  : 20,
    fontWeight: "bold",
    color     : "#fff",
    marginTop : 10
  },
  description: {
    fontSize: 16,
    color   : "#eee"
  },
  score      : {
    fontSize    : 20,
    fontWeight  : "bold",
    color       : "green",
    marginBottom: 10
  }
} )
