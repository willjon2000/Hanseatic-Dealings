import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, SafeAreaView, Animated, Easing, ImageBackground, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { hideAsync } from 'expo-splash-screen'
import { TouchableOpacity } from 'react-native-gesture-handler'

const backgroundImage = require('../assets/big_map.png')

export default function Trade({ route, navigation }: NativeStackScreenProps<any>) {
  const initialValue = 0;
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

  hideAsync()

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: '#fff', padding: 10, marginBottom: 30, borderRadius: 5 }}><Text>USERNAME</Text></View>
        <TouchableOpacity onPress={() => navigation.navigate('Map')} style={{ backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 30 }}>Singleplayer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10, marginBottom: 100 }}>
          <Text style={{ fontSize: 30 }}>Multiplayer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 30 }}>Settings</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <AnimetedImage 
        resizeMode="repeat" 
        style={[styles.background, {
          transform: [ { translateX: translateAnimation }, { translateY: translateAnimation } ],
        }]}
      source={backgroundImage} />
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
  }
})