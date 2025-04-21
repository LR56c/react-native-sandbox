import { Image, StyleSheet, Text, View } from "react-native"

export function GameCard( { game } ) {
  return (
    <View key={ game.id } style={ styles.card }>
      <Image source={ { uri: game.thumbnail } } style={ styles.image }/>
      <Text style={ styles.title }>{ game.title }</Text>
      <Text
        style={ styles.description }>{ game.short_description }</Text>
    </View>
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
