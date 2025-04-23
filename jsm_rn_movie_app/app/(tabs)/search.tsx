import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"
import MovieCard
                                                          from "@/components/MovieCard"
import {
  images
}                                                         from "@/constants/images"
import {
  useFetch
}                                                         from "@/services/useFetch"
import { fetchPopularMovies }                             from "@/services/api"
import {
  icons
}                                                         from "@/constants/icons"
import SearchBar
                                                          from "@/components/SearchBar"
import { useEffect, useState }                            from "react"
import {
  updateSearchCount
}                                                         from "@/services/appwrite"

export default function Search() {
  const [searchQuery, setSearchQuery] = useState( "" )

  const {
          data: movies = [],
          loading,
          error,
          refetch: loadMovies,
          reset
        } = useFetch( () => fetchPopularMovies( searchQuery ), false )

  const handleSearch = ( text: string ) => {
    setSearchQuery( text )
  }

  useEffect( () => {
    const timeoutId = setTimeout( async () => {
      if ( searchQuery.trim() ) {
        await loadMovies()
      }
      else {
        reset()
      }
    }, 500 )

    return () => clearTimeout( timeoutId )
  }, [searchQuery] )

  useEffect( async () => {
    if ( movies?.length! > 0 && movies?.[0] ) {
      await updateSearchCount( searchQuery, movies[0] )
    }
  }, [movies] )

  return (
    <View className="flex-1 bg-primary relative">
      <Image source={ images.bg } className="flex-1 absolute w-full z-0"
             resizeMode="cover"/>
      <FlatList
        data={ movies }
        renderItem={ ( { item } ) => (
          <MovieCard { ...item } />
        ) }
        keyExtractor={ ( item ) => item.id }
        columnWrapperStyle={ {
          justifyContent: "center",
          gap           : 16,
          marginVertical: 16
        } }
        numColumns={ 3 }
        contentContainerStyle={ {
          paddingBottom: 100
        } }
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={ icons.logo } className="w-12 h-10"/>
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={ searchQuery }
                onChangeText={ handleSearch }
              />
            </View>

            { loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            ) }

            { error && (
              <Text className="text-red-500 px-5 my-3">
                Error: { error.message }
              </Text>
            ) }

            { !loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{ " " }
                  <Text className="text-accent">{ searchQuery }</Text>
                </Text>
              ) }
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                { searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies" }
              </Text>
            </View>
          ) : null
        }
      ></FlatList>
    </View>
  )
}
