import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styleScheme from '../style/colorSchemes'
import { colors } from '../style/colors';
import GeometryBackground from './GeometryBackground';
import Line from './Line';
import * as Location from "expo-location";
import { Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';

const OrderItem = ({ item, styles, openImg }) => {
    const getStatus = () => {
        if (item.date_cancel != null){
            return "Отменен";
        }
        else if (item.date_accept == null && item.date_complite == null) {
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

    return (<View style={{ width: '90%', marginBottom: 30 }}>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '70%' }}>
                <Text style={styles.subTitle}>номер заказа</Text>
                <Text style={styles.text400_16}>{"0".repeat(5 - item.id.toString().length) + item.id}</Text>
            </View>
            <View>
                <Text style={styles.subTitle}>статус</Text>
                <Text style={styles.btnText}>{getStatus()}</Text>
            </View>
        </View>
        <Line />

        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '70%' }}>
                <Text style={styles.subTitle}>время заказа</Text>
                <Text style={styles.text400_16}>{item.date_create.split(" ")[1]}</Text>
            </View>
            <View>
                <Text style={styles.subTitle}>время вывоза</Text>
                <Text style={styles.text400_16}>{item.date_complite}</Text>
            </View>
        </View>
        <Line />
        <View>
            <Text style={styles.subTitle}>адрес</Text>
            <Text style={styles.text400_16}>{address}</Text>
        </View>
        <Line />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text style={styles.subTitle}>обслуживающая машина</Text>
                <Text style={styles.text400_16}>{item.car}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.9} onPress={() => openImg(item.photo)} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                <EvilIcons name="image" size={24} color="white" />
            </TouchableOpacity>
        </View>
    </View>)
}

export default OrderItem