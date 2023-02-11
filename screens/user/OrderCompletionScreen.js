import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import { Feather, EvilIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const CreatePhotoScreen = ({ navigation, route }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const [selectedLanguage, setSelectedLanguage] = useState();
    const [address, setAddress] = useState("");

    useLayoutEffect(() => {
        (async () => {
            const address = await AsyncStorage.getItem("orderAddress");
            setAddress(address);
            await AsyncStorage.multiRemove(["orderAddress", "orderRegion"]);
        })();
    }, [])


    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]}>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <GeometryBackground />
            <SafeAreaView >
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '4%' }}>
                    <View style={{ height: 3, backgroundColor: '#549D41', marginRight: '3%', width: 50 }} />
                    <View style={{ height: 3, backgroundColor: '#549D41', marginRight: '3%', width: 50 }} />
                    <View style={{ height: 3, backgroundColor: '#549D41', marginRight: '3%', width: 50 }} />
                </View>
            </SafeAreaView>


            <View style={{ marginTop: '4%', padding: '4%' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>Номер заказа: {"0".repeat(5 - route.params.orderId.toString().length) + route.params.orderId}</Text>
                    <Text style={[styles.subTitle, { textAlign: 'center' }]}>{address}</Text>
                    {/* <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>сфотографируйте мусор, который необходимо вывезти</Text> */}

                    <Image source={require('../../assets/items/completion.png')} style={{ height: '70%', width: '70%' }} resizeMode='contain' />

                    <Text style={[styles.title, { textAlign: 'center' }]}>Оператор свяжется с Вами в ближайшее время</Text>
                </View>

                <View style={{ paddingHorizontal: '20%' }}>
                    <TouchableOpacity activeOpacity={0.95} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [{ name: "main_navigator" }]
                                }));
                        }}  >
                        <Text style={styles.title}>К заказам</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.95} style={{ marginTop: '2%', backgroundColor: '#549D41', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [{ name: "main_navigator" }]
                                }));
                        }} >
                        <Text style={styles.title}>На главную</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default CreatePhotoScreen
