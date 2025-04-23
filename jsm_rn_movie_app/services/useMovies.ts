import { useEffect, useState } from "react"
import { fetchPopularMovies }  from "@/services/api"

export const useFetch =<T>(fetchFunction : ()=>Promise<T>, autoFetch = true) => {
  const [data, setData]       = useState<T | null>( null )
  const [loading, setLoading] = useState( false )
  const [error, setError]     = useState<Error | null>( null )

  const fetchData = async () => {
    try {
      setLoading( true )
      setError( null )
      const result = await fetchFunction()
      setData( result )
    }
    catch ( e ) {
      setError( e instanceof Error ? e : new Error( "Unknown error" ) )
    }
    finally {
      setLoading( false )
    }
  }

  const reset = () => {
    setData( null )
    setError( null )
    setLoading( false )
  }

  useEffect( () => {
    if ( autoFetch ) {
      fetchData()
    }
  }, [] )

  return { data, loading, error, fetchData, reset }
}
