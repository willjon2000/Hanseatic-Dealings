import React from 'react'
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'

export default function Trade({ route, navigation }: NativeStackScreenProps<any>) {
  

  return (
    <SafeAreaView style={styles.container}>
      <Text>{route.params!.id}</Text>
      <Button onPress={() => navigation.goBack()} title="Tilbage"/>
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})