import React, {useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { colors } from '../style/colors';
import GeometryBackground from './GeometryBackground';
import Line from './Line';
import * as Location from "expo-location";
import { Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';
import { domain } from '../domain';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const GridItem = ({ item, colorScheme, openImg, delEntry, setAcceptEntry }) => {

    const styles = colorScheme.styles;

    const [check, setCheck] = useState(false);

    const [address, setAddress] = useState("");

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

    const acceptEntry = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.post(domain + "/accept_entry", { "id": item.id }, { headers: { "Authorization": "Token " + token } });
            setAcceptEntry(item);
        } catch (err) {
            Alert.alert("Ошибка", "Данные заказ уже в обработке")
        }
    }

    const cancelEntry = async () => {
        try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.post(domain + "/cancel_entry", { "id": item.id }, { headers: { "Authorization": "Token " + token } });
        delEntry(item.id)
        return;
    } catch (err) {

        Alert.alert("Ошибка", "Данные заказ уже в обработке")
    }
    }

    useEffect(() => {
        (async () => {
            const add = await Location.reverseGeocodeAsync({ latitude: item.grid.location.coordinates[1], longitude: item.grid.location.coordinates[0] })
            setAddress(add[0].name);
        })();

    }, [])

    return (
        <View style={{ padding: '4%' }}>

            <View style={{ padding: '4%', backgroundColor: '#f2f2f3', borderRadius: '20', marginTop: '4%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.subTitle}>от кого</Text>
                        <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>{item.user.username}</Text>
                    </View>
                    <View>
                        <Text style={styles.subTitle}>статус</Text>
                        <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>{getStatus()}</Text>
                    </View>
                </View>
                <Line />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.subTitle}>местоположение</Text>
                        <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>{address}</Text>
                    </View>
                    <View>
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                            <Entypo name="location-pin" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Line />
                <View style={{ flexDirection: 'row', justifyContent: check ? "space-between" : 'center', marginTop: '2%' }}>
                    { check && <TouchableOpacity onPress={cancelEntry} activeOpacity={0.9} style={{ backgroundColor: '#FC2F2F', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "white" }}>Отклонить</Text>
                    </TouchableOpacity> }
                    <TouchableOpacity activeOpacity={0.9} onPress={() => { setCheck(true); openImg(item.photo_fill) }} style={{ backgroundColor: '#ACACAC', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "white" }}>Фото</Text>
                    </TouchableOpacity>
                    { check && <TouchableOpacity onPress={acceptEntry} activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "white" }}>Принять</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
    )
}

export default GridItem