import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, Animated, Easing, ImageBackground, View, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { hideAsync } from 'expo-splash-screen'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Menu({ route, navigation }: NativeStackScreenProps<any>) {
  const { token } = useSelector((state: any) => state.auth)

  let [ship, setShip] = useState<any>({})
  let [upgrade, setUpgrade] = useState<any>({})

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      hideAsync().catch(err => {})

      axios.get(`http://10.130.54.54:8000/api/ship/${route.params.ship}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
        setShip(res.data)
      })

      axios.get(`http://10.130.54.54:8000/api/ship/${route.params.ship}/upgrade`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
        setUpgrade(res.data)
      })
    })

    return () => {
      focusHandler()
    }
  }, [])

  const upgradeClick = () => {
    axios.put(`http://10.130.54.54:8000/api/ship/${route.params.ship}/upgrade`, { }, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
      setUpgrade(res.data)

      axios.get(`http://10.130.54.54:8000/api/ship/${route.params.ship}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
        setShip(res.data)
      })
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={{ color: '#fff', marginBottom: 10 }}>Upgrade price: {upgrade.price}</Text>
        <Text style={{ color: '#fff', marginBottom: 10 }}>Ship coins: {ship.coins}</Text>
        <Text style={{ color: '#fff', marginBottom: 10 }}>Ship lvl: {ship.lvl}</Text>
        <TouchableOpacity onPress={upgradeClick} style={{ backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 5, borderRadius: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 16 }}>UPGRADE!</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar style="dark" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  }
})