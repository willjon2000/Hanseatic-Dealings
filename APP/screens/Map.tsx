import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, SafeAreaView, Modal, TouchableOpacity, Text, View, Alert, Platform } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { hideAsync } from 'expo-splash-screen'
import ImageViewer from 'react-native-image-zoom-viewer'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Map({ route, navigation }: NativeStackScreenProps<any>) {
  const { token } = useSelector((state: any) => state.auth)

  let [visible, setVisible] = useState(true)
  let [date, setDate] = useState(new Date(route.params.date.replace(' ', 'T')))
  const outpostClick = (id: number) => {
    
    axios.get(`http://10.130.54.54:8000/api/ship/${route.params.ship}/outpost/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
      if(res.data.success){
        navigation.push('Trade', { id, ship: route.params.ship, save: route.params.save })
        
        setVisible(false)
      }else
        Alert.alert('Time MUST pass', 'You have to wait one month before you can sail to another outpost', [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        ]);
    })
  }

  const upgradeScreen = () => {
    setVisible(false)

    navigation.push('Upgrade', { ship: route.params.ship })
  }

  useEffect(() => {
    let timeInterval
    const focusHandler = navigation.addListener('focus', () => {
      hideAsync().catch(err => {})
      setVisible(true)

      if(!timeInterval && Platform.OS == 'ios')
        timeInterval = setInterval(() => {
          date.setHours(date.getHours() + 2, 0, 0, 0)
          setDate(new Date(date))
        }, 200)
    })

    return () => {
      focusHandler()
      if(timeInterval)
        clearInterval(timeInterval)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={visible} transparent={true} supportedOrientations={['portrait', 'landscape']} >
        <ImageViewer 
          renderIndicator={() => <></>} 
          imageUrls={[{ url: '', props: { source: require('../assets/map.png') } }]} 
            renderImage={(props) => {
            return (
              <>
                <Image {...props} />
                <TouchableOpacity style={[styles.button, { top: '40.6%', left: '4.95%' }]} onPress={() => outpostClick(1)} />
                <TouchableOpacity style={[styles.button, { top: '79.3%', left: '7.6%' }]} onPress={() => outpostClick(2)} />
                <TouchableOpacity style={[styles.button, { top: '57.4%', left: '9.9%' }]} onPress={() => outpostClick(3)} />
                <TouchableOpacity style={[styles.button, { top: '88%', left: '17.15%' }]} onPress={() => outpostClick(4)} />
                <TouchableOpacity style={[styles.button, { top: '93.85%', left: '27.44%' }]} onPress={() => outpostClick(5)} />
                <TouchableOpacity style={[styles.button, { top: '76.28%', left: '27.54%' }]} onPress={() => outpostClick(6)} />
                <TouchableOpacity style={[styles.button, { top: '7.2%', left: '29.45%' }]} onPress={() => outpostClick(7)} />
                <TouchableOpacity style={[styles.button, { top: '59.45%', left: '33.15%' }]} onPress={() => outpostClick(8)} />
                <TouchableOpacity style={[styles.button, { top: '79.05%', left: '33.9%' }]} onPress={() => outpostClick(9)} />
                <TouchableOpacity style={[styles.button, { top: '76.4%', left: '37.6%' }]} onPress={() => outpostClick(10)} />
                <TouchableOpacity style={[styles.button, { top: '45.3%', left: '37.9%' }]} onPress={() => outpostClick(11)} />
                <TouchableOpacity style={[styles.button, { top: '73.9%', left: '40.9%' }]} onPress={() => outpostClick(12)} />
                <TouchableOpacity style={[styles.button, { top: '21.2%', left: '42.42%' }]} onPress={() => outpostClick(13)} />
                <TouchableOpacity style={[styles.button, { top: '72.6%', left: '44.7%' }]} onPress={() => outpostClick(14)} />
                <TouchableOpacity style={[styles.button, { top: '57.8%', left: '49.3%' }]} onPress={() => outpostClick(15)} />
                <TouchableOpacity style={[styles.button, { top: '76.48%', left: '51.94%' }]} onPress={() => outpostClick(16)} />
                <TouchableOpacity style={[styles.button, { top: '38.9%', left: '63.15%' }]} onPress={() => outpostClick(17)} />
                <TouchableOpacity style={[styles.button, { top: '25.3%', left: '64%' }]} onPress={() => outpostClick(18)} />
                <TouchableOpacity style={[styles.button, { top: '70.3%', left: '64.08%' }]} onPress={() => outpostClick(19)} />
                <TouchableOpacity style={[styles.button, { top: '80.1%', left: '64.35%' }]} onPress={() => outpostClick(20)} />
                <TouchableOpacity style={[styles.button, { top: '25.24%', left: '76.82%' }]} onPress={() => outpostClick(21)} />
                <TouchableOpacity style={[styles.button, { top: '45.1%', left: '78.19%' }]} onPress={() => outpostClick(22)} />
                <TouchableOpacity style={[styles.button, { top: '13.22%', left: '91.19%' }]} onPress={() => outpostClick(23)} />
                <TouchableOpacity style={[styles.button, { top: '25.1%', left: '95.55%' }]} onPress={() => outpostClick(24)} />
              </>
            )
          }} />
          <View style={{ position: 'absolute', top: '6%', left: '5%' }}>
            {Platform.OS == 'ios' && <TouchableOpacity onPress={upgradeScreen} >
              <Text style={{ color: 'white', fontSize: 13 }}>Upgrade</Text>
            </TouchableOpacity>}
          </View>
          <View style={{ position: 'absolute', top: '5%', right: '5%' }}>
            <Image source={require('../assets/scroll.png')} />
            {Platform.OS == 'ios' && <Text style={{ position: 'absolute', color: 'white', top: '22%', left: '10%', fontSize: 13 }}>{date.getDate()} {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][date.getMonth()]} {date.getFullYear()} {String(date.getHours()).padStart(2, '0')}:{String(date.getMinutes()).padStart(2, '0')}</Text>}
            {Platform.OS !== 'ios' && <TouchableOpacity style={{ position: 'absolute', top: '22%', left: '10%' }} onPress={upgradeScreen} >
              <Text style={{ color: 'white', fontSize: 13 }}>Upgrade</Text>
            </TouchableOpacity>}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: '15%', right: '5%' }}>
              <Text style={{ color: 'white', fontSize: 13 }}>Go back</Text>
            </TouchableOpacity>
          </View>
          {/*<Text style={{ position: 'absolute', color: 'white', top: '5%', right: '4%', fontSize: 10 }}>Hello, World!</Text>*/}
      </Modal>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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