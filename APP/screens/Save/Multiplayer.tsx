import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, SafeAreaView, Modal, TouchableOpacity, Text, View, Alert } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { hideAsync } from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function SaveMultiplayer({ route, navigation }: NativeStackScreenProps<any>) {
  const { token } = useSelector((state: any) => state.auth)

  let [saves, setSaves] = useState<any>([])

  useEffect(() => {
    let timeInterval
    const focusHandler = navigation.addListener('focus', () => {
      hideAsync().catch(err => {})

      timeInterval = setInterval(() => {
        axios.get(`http://10.130.54.54:8000/api/saves`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
          setSaves(res.data)
        })
      }, 60000)
    })

    return () => {
      focusHandler()

      if(timeInterval)
        clearInterval(timeInterval)
    }
  }, [])

  const saveClick = (save) => {
    if(!save) return

    axios.get(`http://10.130.54.54:8000/api/user/saves`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
      let userShip = res.data.find(i => i.saveGameID == save.id)

      if(userShip)
        navigation.navigate('Map', { ship: userShip.id, save: save.id, date: save.timeInGame })
      else{
        axios.post(`http://10.130.54.54:8000/api/ships`, { saveGameID: save.id }, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
          navigation.navigate('Map', { ship: res.data.id, save: res.data.saveGameID, date: res.data.savegame.timeInGame })
        })
      }
    }).catch(err => console.log(err))
    
    
  }

  const displayDate = (date: string) => {
    let d = new Date(date)

    return `${d.getDate()}. ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]} ${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  return (
    <SafeAreaView style={styles.container}>
      {saves.map((save, i) => <TouchableOpacity onPress={() => saveClick(saves[0])} style={{ backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 40, marginBottom: 20, borderRadius: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 16 }}>{save.name || 'N/A'}</Text>
        <Text style={{ fontSize: 13 }}>{displayDate(save.timeInGame)}</Text>
      </TouchableOpacity>)}
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>Go back</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#ffffff00',
    borderRadius: 100,
    width: 20,
    height: 20,
    position: 'absolute',
    transform: [{ translateX: -10 }, { translateY: -10 }]
  }
})