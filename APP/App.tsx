import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FlashMessage from 'react-native-flash-message'
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen'
import { getItemAsync } from 'expo-secure-store'
import { Provider } from 'react-redux'
import * as ScreenOrientation from 'expo-screen-orientation'
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors'

import store from './store'
import { signIn, signOut } from './store/authSlice'

import SignIn from './screens/SignIn'
import Menu from './screens/Menu'
import SaveSingleplayer from './screens/Save/Singleplayer'
import SaveMultiplayer from './screens/Save/Multiplayer'
import Map from './screens/Map'
import Trade from './screens/Trade'

preventAutoHideAsync()

const Stack = createNativeStackNavigator()

export default function App() {
  let [signedIn, setSignedIn] = useState(false)
  store.subscribe(() => {
    setSignedIn(store.getState().auth.signedIn)
  })

  getItemAsync('accessToken').then(async val => {
    if(val)
      store.dispatch(signIn(val))
    else
      store.dispatch(signOut())
  })

  useEffect(() => {    
    const deviceMotionMeasurement = DeviceMotion.addListener(async (e: DeviceMotionMeasurement) => {
      if(e.orientation == 90)
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)

      if(e.orientation == -90)
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)

      if(e.orientation == 0)
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    })

    return () => {
      if(deviceMotionMeasurement)
        deviceMotionMeasurement.remove()
    }
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {!signedIn ? (
            <>
              <Stack.Screen name="SignIn" component={SignIn} options={{ title: "Sign in" }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="SaveSingleplayer" component={SaveSingleplayer} options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="SaveMultiplayer" component={SaveMultiplayer} options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="Map" component={Map} options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="Trade" component={Trade} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </Provider>
  )
}
