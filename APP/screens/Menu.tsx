import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, Animated, Easing, ImageBackground, View, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { deleteItemAsync } from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { hideAsync } from 'expo-splash-screen'
import { useSelector } from 'react-redux'
import axios from 'axios'

import store from '../store'
import { signOut } from '../store/authSlice'

const backgroundImage = require('../assets/big_map.png')

export default function Menu({ route, navigation }: NativeStackScreenProps<any>) {
  const { token } = useSelector((state: any) => state.auth)

  let [user, setUser] = useState<any>({})

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      hideAsync().catch(err => {})

      axios.get(`http://10.130.54.54:8000/api/user`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
        setUser(res.data)
      })
    })

    return () => {
      focusHandler()
    }
  }, [])

  /*const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;
  
  const translate = () => {
    console.log("AA")
    translateValue.setValue(initialValue);
    Animated.timing(translateValue, {
      toValue: 1,
      duration: 75000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => translate());
  }

  useEffect(() => {
    setTimeout(translate, 250)
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-2500, 0],
  });

  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);
*/
  hideAsync()
  
  const signOutFunc = () => {
    deleteItemAsync('accessToken').then(() => {
      store.dispatch(signOut())
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: '#fff', padding: 10, marginBottom: 30, borderRadius: 5 }}><Text>{user.username}</Text></View>
        <TouchableOpacity onPress={() => navigation.navigate('SaveSingleplayer', { user })} style={ styles.SinglePlayerButton }>
          <Text style={{ fontSize: 30 }}>Singleplayer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SaveMultiplayer', { user })}  style={ styles.MultiPlayerButton }>
          <Text style={{ fontSize: 30 }}>Multiplayer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOutFunc} style={ styles.signOutButton }>
          <Text style={{ fontSize: 30 }}>Sign out</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {/*<AnimetedImage
        resizeMode="repeat"
        style={[styles.background, {
          transform: [ { translateX: translateAnimation }, { translateY: translateAnimation } ],
        }]}
      source={backgroundImage} />*/}
      <StatusBar style="dark" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },

  background: {
    position: 'absolute',
    width: 5000,
    height: 5000,
    top: 0,
    opacity: 1,
    zIndex: 1,
    transform: [ { translateX: 0 }, { translateY: 0 } ]     
  },

  SinglePlayerButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20
  },

  MultiPlayerButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 100
  },

  signOutButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10
  }
})