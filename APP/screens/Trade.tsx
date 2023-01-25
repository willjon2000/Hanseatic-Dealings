import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, SafeAreaView, Button, View, TouchableOpacity, ScrollView} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Trade({ route, navigation }: NativeStackScreenProps<any>) {
    const { token } = useSelector((state: any) => state.auth)

    let [outpostItems,setOutpostItems] = useState([])
    let [ship,setShips] = useState({id: 0,name: "", capacity: 0, coins: 0})
    let [shipItems, setShipItems] = useState([])
    let [quantity,setQuantity] = useState(1)
    var [shipCapacity, setShipCapacity] = useState(0)

    useEffect(() => {
        axios.get(`http://10.130.54.54:8000/api/outpost/${route.params.id}/items?save=${route.params.save}`, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } }).then(async res => {
            setOutpostItems(res.data)
        }).catch(err => console.log(err))
        axios.get(`http://10.130.54.54:8000/api/ship/${route.params.ship}`, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } }).then(async res => {
            setShips(res.data)
        }).catch(err => console.log(err))
        axios.get(`http://10.130.54.54:8000/api/ship/${route.params.ship}/items`, { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } }).then(async res => {
            setShipItems(res.data)

            let total = 0
            res.data.forEach(item => {
                total += Number(item.pivot.amount)
            })
            setShipCapacity(total)
        }).catch(err => console.log(err))
    }, [])

    const buySellItems = (action, item) => {
        let shipItem = getShipItems(item)
        let amount = quantity
        if (action == "sell"){
            if (shipItem?.pivot?.amount < quantity )
                amount = shipItem.pivot.amount
        }
        else
        {
            let outpostItem = outpostItems.find(e => e.id == item.id)
            if (outpostItem?.amount < quantity){
                amount = outpostItem.amount
            }
        }

        axios.post(`http://10.130.54.54:8000/api/outpost/${route.params.id}/item/${item.id}/${action}?save=${route.params.save}`,
            {'amount': amount, 'shipId': ship.id},
            { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } }).then(async res => {
            setShips(res.data.ship)
            setShipItems(res.data.shipItems)
            setOutpostItems(res.data.outpostItems)
            let total = 0
            res.data.shipItems.forEach(item => {
                total += Number(item.pivot.amount)
            })
            setShipCapacity(total)

        }).catch(e => {
            console.log(e.response.data.message)
        })
    }

    const getShipItems = (item) => shipItems.find(e => e.id == item.id)
    const calculateShipItemsValue = (item) => {
        let shipItem = getShipItems(item)
        if (!shipItem) return
        if (shipItem?.pivot?.amount < quantity){
            return shipItem?.pivot?.amount * item.price.sell
        }

        return quantity * item.price.sell
    }

    const getExport = (item) => {
        if (item.export == true){
            return "*"
        }
        return null
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.shopView}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Trading Goods</Text>
            </View>
            <View style={styles.h2Container}>
                <View style={styles.colum}><Text>Ship name</Text><Text style={styles.h2Text}>{ship.name}</Text></View>
                <View style={styles.colum}><Text>Capacity</Text><Text style={styles.h2Text}>{shipCapacity} / {ship.capacity}</Text></View>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.rowHeader}>
                    <View style={styles.colum}><Text style={styles.footNode}>* export</Text><Text style={styles.bold}>Goods</Text></View>
                    <View style={styles.colum}><Text style={styles.bold}>Outpost</Text></View>
                    <View style={styles.colum}><Text style={styles.bold}>Buy</Text></View>
                    <View style={styles.colum}><Text style={styles.bold}>Sell</Text></View>
                    <View style={styles.colum}><Text style={styles.bold}>ship</Text></View>
                    <View style={styles.colum}><Text style={styles.bold}>ø-price</Text></View>
                </View>
                <ScrollView>
                {outpostItems.map((item,i) => (
                    <View key={i} style={styles.rowContent}>

                        <View style={styles.colum}><Text style={styles.rowText}>{item.name} {getExport(item)}</Text></View>
                        <View style={styles.colum}><Text style={styles.rowText}>{item.amount || 0}</Text></View>
                        <TouchableOpacity style={[styles.colum, styles.buySellButton]} disabled={(item.price.buy || 0) == 0}  onPress={() => buySellItems('buy', item)}>
                            <Text style={styles.rowText}>{item.price.buy || 0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.colum, styles.buySellButton]} disabled={(item.price.sell || 0) == 0} onPress={() => buySellItems('sell',item)}>
                            <Text style={styles.rowText}>{item.price.sell || 0}</Text>
                        </TouchableOpacity>
                        <View style={styles.colum}><Text style={styles.rowText}>{getShipItems(item)?.pivot?.amount || 0}</Text></View>
                        <View style={styles.colum}><Text style={styles.rowText}>{calculateShipItemsValue(item)}</Text></View>

                </View>))}
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <Text style={styles.coins}>coins: {ship.coins}</Text>
                <TouchableOpacity style={[styles.buySellButton, styles.oneButton]} onPress={() => setQuantity(1)}>
                    <Text>1</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buySellButton, styles.fiveButton]} onPress={() => setQuantity(5)}>
                    <Text>5</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buySellButton, styles.fiftyButton]} onPress={() => setQuantity(50)}>
                    <Text>50</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buySellButton, styles.maxButton]} onPress={() => setQuantity(9999999)}>
                    <Text>max</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.backButton]} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>back</Text>
                </TouchableOpacity>
            </View>
        </View>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
          flex: 1,
          padding: 11,
          backgroundColor: "#6A3112",
    },

    shopView: {
        marginTop: 25,
        flex: 1,
        backgroundColor: "#DCD1C6",
        borderRadius: 10,
    },

    titleContainer: {
        flex: 0.7
    },

    title:{
        marginTop: 10,
        color: 'black',
        fontSize: 20,
        fontWeight: "900",
        textAlign: "center"
    },

    h2Container:{
        flex: 1.6,
        flexDirection: "row"
    },

    h2Text:{
        fontSize: 17,
        fontWeight: "bold"
    },

    rowContainer:{
        flex: 10,
        width:"100%"
    },

    rowHeader:{
        flexDirection: "row",
        paddingHorizontal: 2
    },

    rowContent: {
        height:35,
        flexDirection: "row"
    },

    footNode:{
        marginTop: -20
    },

    colum:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    bold:{
        fontWeight: "bold",
    },

    rowText: {
        fontSize: 12
    },

    buySellButton: {
        backgroundColor: "#eddfd3",
        borderRadius: 20,
        marginVertical: 2,
        marginHorizontal: 2,
        color: "#000",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 10,
    },

    footer:{
        flex: 1,
        flexDirection: "row"
    },

    coins:{
        textAlign: "left",
        fontSize: 11,
        bottom: 20,
        position: "absolute"
    },

    oneButton: {
        bottom: 10,
        left: "22%",
        paddingHorizontal:12,
        paddingVertical:5,
        position: "absolute"
    },

    fiveButton: {
        bottom: 10,
        left: "33%",
        paddingHorizontal:12,
        paddingVertical:5,
        position: "absolute"
    },

    fiftyButton: {
        bottom: 10,
        left: "44%",
        paddingHorizontal: 12,
        paddingVertical: 5,
        position: "absolute"
    },

    maxButton: {
        bottom: 10,
        left: "57%",
        paddingHorizontal: 12,
        paddingVertical: 5,
        position: "absolute"
    },

    backButton: {
        backgroundColor: "#FBBD84",
        right: 10,
        color: "#fff",
        paddingVertical:10,
        paddingHorizontal: 18,
        fontSize: 16,
        borderRadius: 20,
        position: "absolute"
    },

    backButtonText: {
        color: "black",
        fontWeight: "bold"
    }

})