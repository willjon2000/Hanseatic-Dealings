import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, SafeAreaView, Modal, TouchableOpacity, Text, View, Alert } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { hideAsync } from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function SaveSingleplayer({ route, navigation }: NativeStackScreenProps<any>) {
  const { token } = useSelector((state: any) => state.auth)

  let [saves, setSaves] = useState<any>([])

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      hideAsync().catch(err => {})

      axios.get(`http://10.130.54.54:8000/api/user/ships`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
        setSaves(res.data)
      })
    })

    return () => {
      focusHandler()
    }
  }, [])

  const saveClick = (save) => {
    if(!save)
      Alert.alert('Start new save?', 'Are you sure you want to create a new save', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { 
          text: 'Yes', 
          onPress: () => {
            axios.post(`http://10.130.54.54:8000/api/ships`, { }, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
              navigation.navigate('Map', { ship: res.data.id, save: res.data.saveGameID, date: res.data.savegame.timeInGame })
            }).catch(err => console.log(err))
          } 
        }
      ])
    else
      navigation.navigate('Map', { ship: save?.id, save: save?.saveGameID, date: save?.savegame.timeInGame })
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
          axios.delete(`http://10.130.54.54:8000/api/ship/${save.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
            saves.splice(i, 1)
            let newSaves = JSON.parse(JSON.stringify(saves))
            setTimeout(() => setSaves(newSaves), 250)
          })
        } 
      }
    ])

  }

  const displayDate = (date: string) => {
    let d = new Date(date.replace(' ', 'T'))

    return `${d.getDate()}. ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]} ${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onLongPress={() => saveLongPress(saves[0], 0)} onPress={() => saveClick(saves[0])} style={ styles.singlePlayerWorld }>
            <Text style={{ fontSize: 16 }}>{saves[0]?.name || 'EMPTY'}</Text>
            <Text style={{ fontSize: 13 }}>{saves[0]?.savegame.timeInGame ? displayDate(saves[0]?.savegame.timeInGame) : 'EMPTY'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onLongPress={() => saveLongPress(saves[1], 1)} onPress={() => saveClick(saves[1])} style={ styles.singlePlayerWorld }>
            <Text style={{ fontSize: 16 }}>{saves[1]?.name || 'EMPTY'}</Text>
            <Text style={{ fontSize: 13 }}>{saves[1]?.savegame.timeInGame ? displayDate(saves[1]?.savegame.timeInGame) : 'EMPTY'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onLongPress={() => saveLongPress(saves[2], 2)} onPress={() => saveClick(saves[2])} style={ styles.singlePlayerWorld }>
            <Text style={{ fontSize: 16 }}>{saves[2]?.name || 'EMPTY'}</Text>
            <Text style={{ fontSize: 13 }}>{saves[2]?.savegame.timeInGame ? displayDate(saves[2]?.savegame.timeInGame) : 'EMPTY'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onLongPress={() => saveLongPress(saves[3], 3)} onPress={() => saveClick(saves[3])} style={ styles.singlePlayerWorld }>
            <Text style={{ fontSize: 16 }}>{saves[3]?.name || 'EMPTY'}</Text>
            <Text style={{ fontSize: 13 }}>{saves[3]?.savegame.timeInGame ? displayDate(saves[3]?.savegame.timeInGame) : 'EMPTY'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={ styles.backButton }>
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
  },

  singlePlayerWorld: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center'
  },

  backButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center'
  }
})