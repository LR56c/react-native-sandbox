import { create } from "zustand"
import AsyncStorage from "@react-native-async-storage/async-storage"

type RegisterUser = {
  username: string
  email: string
  password: string
}

type AuthState = {
  user: any | null
  token: string
  isLoading: boolean
  register: ( user: RegisterUser ) => Promise<boolean>
}

export const useAuthStore = create<AuthState>( ( set ) => {
  return (
    {
      user     : null,
      token    : "",
      isLoading: false,
      register : async ( user: RegisterUser ) => {
        set( { isLoading: true } )
        try {
          console.log( "Registering user", user )
          const response = await fetch(
            "http://localhost:3000/api/auth/register", {
              method : "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body   : JSON.stringify( user )
            } )
          const data     = await response.json()
          if ( !response.ok ) {
            throw new Error( data.message )
          }
          await AsyncStorage.setItem( "user", JSON.stringify( data.user ) )
          await AsyncStorage.setItem( "token", data.token )
          set( { user: data.user, token: data.token, isLoading: false } )
          return true
        }
        catch ( error ) {
          console.error('error: ', error )
          set( { isLoading: false } )
          return false
        }
      }
    }
  )
} )
