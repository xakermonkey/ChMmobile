import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import styleScheme from '../style/colorSchemes'
import { colors } from '../style/colors';
import GeometryBackground from './GeometryBackground';
import Line from './Line';
import * as Location from "expo-location";
import { Ionicons, Entypo, EvilIcons, AntDesign } from '@expo/vector-icons';
import { domain } from '../domain';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const DriverNewOrderItem = ({ item, styles, openImg, delOrder, setAcceptOrder }) => {

    const [check, setCheck] = useState(false);

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
    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState();
    const MapRef = useRef();
    

    const acceptOrder = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.post(domain + "/accept_order", { "id": item.id }, { headers: { "Authorization": "Token " + token } });
            await setAcceptOrder(item);
        } catch (err) {
            Alert.alert("Ошибка", "Данные заказ уже отменен")
        }
    }

    const cancelOrder = async () => {
        try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.post(domain + "/cancel_order", { "id": item.id }, { headers: { "Authorization": "Token " + token } });
        delOrder(item.id);
        return;
    } catch (err) {
        Alert.alert("Ошибка", "Данные заказ уже в обработке")
    }
    }

    useEffect(() => {
        (async () => {
            const add = await Location.reverseGeocodeAsync({ latitude: item.address.location.coordinates[1], longitude: item.address.location.coordinates[0] })
            setAddress(add[0].name);
            let location = await Location.getLastKnownPositionAsync();
            setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
        })();

    }, [])


    return (
        <View style={{ padding: '4%', width: '100%' }}>
            <Modal
                animationType="slide"
                //animationInTiming = {13900}
                // transparent={true}
                visible={modalVisible}
                animationOut="slide"
                swipeDirection="down"
                presentationStyle='formSheet'
            >
                <View style={{ position:"absolute", zIndex:1, top: 10, left: 10 }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.9}
                            style={{ backgroundColor: '#549D41', height: 35, width: 35, padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                <MapView style={{
                width: '100%',
                height: '100%',
            }}
                initialRegion={{
                    latitude: item.address.location.coordinates[1],
                    longitude: item.address.location.coordinates[0],
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0221
                }}
                ref={MapRef}
                showsUserLocation={true}
                userLocationPriority="balanced"
            >
                <Marker coordinate={{ latitude: item.address.location.coordinates[1], longitude: item.address.location.coordinates[0] }} />
                {/* <MapViewDirections
                    origin={location}
                    destination={{latitude: item.address.location.coordinates[1], longitude: item.address.location.coordinates[0]}}
                    strokeWidth={3}
                    strokeColor="hotpink"
                /> */}
                </MapView>
            </Modal>
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
                    <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
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
            <View style={{ flexDirection: 'row', justifyContent: check ? "space-between" : 'center', marginTop: '2%' }}>
                {check && <TouchableOpacity onPress={cancelOrder} activeOpacity={0.9} style={{ backgroundColor: '#FC2F2F', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "white" }}>Отклонить</Text>
                </TouchableOpacity>}
                <TouchableOpacity activeOpacity={0.9} onPress={() => { setCheck(true); openImg(item.photo) }} style={{ backgroundColor: '#ACACAC', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "white" }}>Фото</Text>
                </TouchableOpacity>
                {check && <TouchableOpacity onPress={acceptOrder} activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "white" }}>Принять</Text>
                </TouchableOpacity>}
            </View>
        </View>
    )
}

export default DriverNewOrderItem