import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, ScrollView, Image, View } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';

import axios from 'axios';
import { domain } from '../../domain';

const IncomingOrders = ({ navigation }) => {

    const colorScheme = styleScheme()
    const styles = colorScheme.styles;

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useFocusEffect(useCallback(() => {
        (async () => {
            try{
                const token = await AsyncStorage.getItem("token");
                const res = await axios.get(domain + "/list_order_driver", {headers: {"Authorization": "Token " + token}});
                setOrders(res.data.orders);
                setLoading(false);
            }catch(err){
                console.log(err);
                setError(true);
            }

        })();
    }, []))

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]}>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <GeometryBackground />
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <SafeAreaView >
                    <View style={[styles.rowBetweenCenter, { padding: '3%' }]}>
                        <View style={{ flex: 1 }}></View>
                        <Text style={[{ width: '80%', textAlign: 'center' }, styles.title, colorScheme.themeTextStyle2,]}>Новые заказы</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('notifications_screen') }} activeOpacity={0.9}
                            style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                            <Ionicons name="notifications" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView style={{ marginTop: '4%' }}>

                <View style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, width: '25%', alignSelf: 'center', marginTop: '6%' }}>
                    <Text style={[styles.text400_16, { color: 'white', textAlign: 'center' }]}>2 января</Text>
                </View>
                <View style={{ padding: '4%', width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.subTitle}>номер заказа</Text>
                            <Text style={styles.text400_16}>0000631</Text>
                        </View>
                        <View>
                            <Text style={styles.subTitle}>статус</Text>
                            <Text style={styles.text400_16}>В обработке</Text>
                        </View>
                    </View>
                    <Line />

                    <Text style={styles.subTitle}>заказчик</Text>
                    <Text style={styles.text400_16}>Иванова Светлана Андреевна</Text>
                    <Line />

                    <Text style={styles.subTitle}>номер телефона</Text>
                    <Text style={styles.text400_16}>+79615670198</Text>
                    <Line />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.subTitle}>местоположение</Text>
                            <Text style={styles.text400_16}>СНТ Солнечный Яр</Text>
                        </View>
                        <View>
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                                <Entypo name="location-pin" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Line />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.subTitle}>улица</Text>
                            <Text style={styles.text400_16}>Доброгорская</Text>
                        </View>
                        <View>
                            <Text style={styles.subTitle}>дом</Text>
                            <Text style={styles.text400_16}>7</Text>
                        </View>
                    </View>
                    <Line />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#FC2F2F', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>Отклонить</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#ACACAC', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>Фото</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>Принять</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default IncomingOrders
