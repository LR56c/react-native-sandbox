import { initializeApp } from "firebase/app"
import {
  Platform
}                        from "react-native"
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth
}                        from "@firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
const firebaseConfig = {
  apiKey           : process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain       : "tg-ai-diet-planner.firebaseapp.com",
  projectId        : "tg-ai-diet-planner",
  storageBucket    : "tg-ai-diet-planner.firebasestorage.app",
  messagingSenderId: "894491884632",
  appId            : "1:894491884632:web:6dd3cf40cba0290ee55e2d"
}

export const firebase = initializeApp( firebaseConfig )
export const auth     = Platform.OS === "web"
  ? getAuth( firebase )
  : initializeAuth( firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  } )
