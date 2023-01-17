import React from 'react'
import { StyleSheet, Text, SafeAreaView, View, ScrollView, TextInput, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { hideAsync } from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import axios from 'axios'
import { setItemAsync } from 'expo-secure-store'
import { useDispatch } from 'react-redux'
import { signIn } from '../store/authSlice'

import axiosErrorHandler from '../utils/axios.errorHandler'

export default function SignIn({ route, navigation }: NativeStackScreenProps<any>) {
  const dispatch = useDispatch()

  hideAsync()

  return (
    <SafeAreaView>
      <ScrollView bounces={false} style={styles.container} keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(data) => {
            axios.post(`http://10.130.64.55:8000/api/login`, data, { headers: { 'Accept': 'application/json' } }).then(async res => {
              setItemAsync('accessToken', res.data.token)
              dispatch(signIn(res.data.token))
            }).catch(err => axiosErrorHandler(err))
          }}
        >
        {({handleChange, handleSubmit, values}) => (
          <View>
            <Text>Username</Text>
            <TextInput
              style={styles.input}
              value={values.username}
              keyboardType="default"
              onChangeText={handleChange('username')}
            />
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry={true}
            />
            <Button onPress={() => handleSubmit()} title="Sign in"/>
          </View>
        )}
        </Formik>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 30,
    borderColor: '#bbb',
  }
});
