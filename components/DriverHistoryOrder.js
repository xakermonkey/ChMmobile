import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styleScheme from '../style/colorSchemes'
import { colors } from '../style/colors';
import GeometryBackground from './GeometryBackground';
import Line from './Line';
import * as Location from "expo-location";
import { Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';
import { domain } from '../domain';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriverHistoryOrder = ({item, styles}) => {

    const getStatus = () => {
        if (item.date_accept == null && item.date_complite == null) {
            return "Создан";
        } else if (item.date_accept != null && item.date_complite == null) {
            return "В обработке";
        } else {
            return "Выполнен"
        }
    }
    const [address, setAddress] = useState("");

    useEffect(() => {
        (async () => {
            const add = await Location.reverseGeocodeAsync({latitude: item.address.location.coordinates[1], longitude: item.address.location.coordinates[0]})
            setAddress(add[0].name);
        })();
        
    }, [])


    return (
        <View style={{ padding: '4%', width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.subTitle}>номер заказа</Text>
                    <Text style={styles.text400_16}>{"0".repeat(5 - item.id.toString().length) + item.id}</Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>статус</Text>
                    <Text style={styles.text400_16}>{getStatus()}</Text>
                </View>
            </View>
            <Line />

            <Text style={styles.subTitle}>Дата заказа</Text>
            <Text style={styles.text400_16}>{item.date_create}</Text>
            <Line />

            <Text style={styles.subTitle}>номер телефона</Text>
            <Text style={styles.text400_16}>{item.user.username}</Text>
            <Line />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={styles.subTitle}>местоположение</Text>
                    <Text style={styles.text400_16}>{address}</Text>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                        <Entypo name="location-pin" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <Line />

            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.subTitle}>улица</Text>
                    <Text style={styles.text400_16}>Доброгорская</Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>дом</Text>
                    <Text style={styles.text400_16}>7</Text>
                </View>
            </View> */}
            {/* <Line /> */}
        </View>
    )
}

export default DriverHistoryOrder