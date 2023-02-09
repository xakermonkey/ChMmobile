import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, ScrollView, Image, View, FlatList, Modal } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain, domain_domain } from '../../domain';
import DriverNewOrderItem from '../../components/DriverNewOrderItem';
import CurrentOrder from "../../components/СurrentOrder";

const IncomingOrders = ({ navigation }) => {

    const colorScheme = styleScheme()
    const styles = colorScheme.styles;

    const [orders, setOrders] = useState([]);
    const [acceptOrder, setAcceptOrder] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [uri, setUri] = useState(null);

    const [refreshing, setRefreshing] = useState(false);

    const updateOrder = async () => {
        try{
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(domain + "/list_order_driver", {headers: {"Authorization": "Token " + token}});
            setOrders(res.data.orders);
            setAcceptOrder(res.data.accept_order);
            // if (res.data.accept_order == null){
            //     setTitle("Новые заказы");
            // }else{
            //     setTitle("Текущий заказ");
            // }
            setLoading(false);
        }catch(err){
            console.log(err);
            setError(true);
        }
    }

    
    useFocusEffect(useCallback(() => {
        (async () => {
            await updateOrder();
        })();
    }, []))

    const EmptyComponent = () => {
        return (<View><Text style={{ color: "white" }}>ПУСТО</Text></View>)
    }

    const openImg = (uri) => {
        setUri(uri);
        setModalVisible(true);
    }

    const delOrder = (id) => {
        console.log("Delete", id);
        setOrders(orders.filter(item => item.id != id))
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await updateOrder();
        setRefreshing(false);
    }



    const renderList = () => {
        return (
            <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ ind, item }) => <DriverNewOrderItem item={item} styles={styles} openImg={openImg} delOrder={delOrder} setAcceptOrder={setAcceptOrder} />}
            ListEmptyComponent={<EmptyComponent />}
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
        )
    }

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]}>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <GeometryBackground />
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <SafeAreaView >
                    <View style={[styles.rowBetweenCenter, { padding: '3%' }]}>
                        <View style={{ flex: 1 }}></View>
                        <Text style={[{ width: '80%', textAlign: 'center' }, styles.title, colorScheme.themeTextStyle2,]}>{acceptOrder == null ? "Новые заказы" : "Текущий заказ" }</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('notifications_screen') }} activeOpacity={0.9}
                            style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                            <Ionicons name="notifications" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

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

            {acceptOrder == null ? renderList() : <CurrentOrder item={acceptOrder} styles={styles} openImg={openImg} />}

                {/* <View style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, width: '25%', alignSelf: 'center', marginTop: '6%' }}>
                    <Text style={[styles.text400_16, { color: 'white', textAlign: 'center' }]}>2 января</Text>
                </View> */}
                
        </View>
    )
}

export default IncomingOrders
