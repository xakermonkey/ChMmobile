import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, ScrollView, Image, View, Modal } from 'react-native'
import { Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';

import axios from 'axios';
import { domain, domain_domain } from '../../domain';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";
import OrderItem from '../../components/OrderItem';

const OrderScreen = ({ navigation }) => {

    const colorScheme = styleScheme()
    const styles = colorScheme.styles;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(false);
    const [date, setDate] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [uri, setUri] = useState(null);

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const res = await axios.get(domain + "/list_order_user", {
                    headers: {
                        "Authorization": "Token " + token
                    }
                });
                setOrders(res.data.orders)
                setLoading(false);
                setDate(res.data.orders[0].date_create.split(" ")[0]);
            }
            catch (err) {
                console.log(err);
                setError(true);
            }
        })();
    }, []));

    const openImg = (uri) => {
        setUri(uri);
        setModalVisible(true);
    }

    const EmptyComponent = () => {
        return (<View><Text style={{ color: "white" }}>ПУСТО</Text></View>)
    }

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]}>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <SafeAreaView >
                    <View style={[styles.rowBetweenCenter, { padding: '3%' }]}>
                        <TouchableOpacity onPress={() => { navigation.navigate('location_screen') }} activeOpacity={0.9} style={[styles.btnHeader, styles.rowBetweenCenter]}>
                            <Entypo name="location-pin" size={24} color={colors.greenText.color} />
                            <Text style={styles.btnText}>СНТ Солнечный Яр</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('notifications_screen') }} activeOpacity={0.9} style={[styles.roundBtn, styles.centerCenter]}>
                            <Ionicons name="notifications" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <Text style={[styles.title, { textAlign: 'center', marginTop: '4%' }]}>Ваши заказы</Text>
            <GeometryBackground />
            {orders.length != 0 &&
                <View style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, width: '25%', alignSelf: 'center', marginTop: '6%', marginBottom: 10 }}>
                    <Text style={[styles.text400_16, { color: 'white', textAlign: 'center' }]}>{date}</Text>
                </View>}

            <Modal
                animationType="slide"
                //animationInTiming = {13900}
                // transparent={true}
                visible={modalVisible}
                animationOut="slide"
                swipeDirection="down"
            >
                <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ width: 60, height: 60 }} ><Text style={{ color: 'black' }}>X</Text></TouchableOpacity>
                    <Image source={{ uri: domain_domain + uri }} style={{ height: '90%', width: '90%', borderRadius: 5 }} resizeMode='contain' />
                </SafeAreaView>

            </Modal>


            <FlatList
                data={orders}
                renderItem={({ ind, item }) => <OrderItem item={item} styles={styles} openImg={openImg} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={<EmptyComponent />}
                contentContainerStyle={{ alignItems: 'center' }}
            />
        </View>
    )
}

export default OrderScreen