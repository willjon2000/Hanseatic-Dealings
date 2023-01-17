import { createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signedIn: false,
    token: ''
  },
  reducers: {
    signOut: (state) => {
      state.token = ''
      state.signedIn = false

      SecureStore.deleteItemAsync('accessToken')
    },
    signIn: (state, action) => {
      state.token = action.payload
      state.signedIn = true
      
      SecureStore.setItemAsync('accessToken', action.payload)
    },
  },
})

export const { signIn, signOut } = authSlice.actions

export default authSlice.reducer