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
    const focusHandler = navigation.addListener('focus', () => {
      hideAsync().catch(err => {})

      axios.get(`http://10.130.54.54:8000/api/saves`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
        setSaves(res.data)
      })
    })

    return () => {
      focusHandler()
    }
  }, [])

  const saveClick = (save) => {
    if(!save) return

    axios.get(`http://10.130.54.54:8000/api/user/saves`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
      let userShip = res.data.find(i => i.savegame.id == save.id)

      if(userShip)
        navigation.navigate('Map', { ship: userShip.id, save: save.id, date: save.timeInGame })
      else{
        axios.post(`http://10.130.54.54:8000/api/ships`, { saveGameID: save.id }, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
          navigation.navigate('Map', { ship: res.data.id, save: res.data.saveGameID, date: res.data.savegame.timeInGame })
        })
      }
    })
    
    
  }

  const saveLongPress = (save, i) => {
    if(!save) return

    Alert.alert('Remove this save?', 'Are you sure you want to delete this save', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { 
        text: 'Yes', 
        onPress: () => {
          saves.splice(i, 1)
          let newSaves = JSON.parse(JSON.stringify(saves))
          setTimeout(() => setSaves(newSaves), 250)
          /*axios.delete(`http://10.130.54.54:8000/api/ship/${save.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
            saves.splice(i, 1)
            let newSaves = JSON.parse(JSON.stringify(saves))
            setTimeout(() => setSaves(newSaves), 250)
          })*/
        } 
      }
    ])

  }

  return (
    <SafeAreaView style={styles.container}>
      {saves.map((save, i) => <TouchableOpacity onLongPress={() => saveLongPress(saves[0], 0)} onPress={() => saveClick(saves[0])} style={{ backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 40, marginBottom: 20, borderRadius: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 16 }}>{save.name || 'N/A'}</Text>
        <Text style={{ fontSize: 13 }}>{save.timeInGame}</Text>
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