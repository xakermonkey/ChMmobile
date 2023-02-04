import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, ScrollView, Image, View } from 'react-native'
import { Ionicons, Entypo, EvilIcons } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';

import axios from 'axios';
import { domain } from '../../domain';

const OrderScreen = ({ navigation }) => {

    const colorScheme = styleScheme()
    const styles = colorScheme.styles;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(false);

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

            }
            catch (err) {
                console.log(err);
                setError(true);
            }
        })();
    }, []));

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

            <ScrollView >
                <View style={{ alignItems: 'center' }}>

                    <View style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, width: '25%', alignSelf: 'center', marginTop: '6%' }}>
                        <Text style={[styles.text400_16, { color: 'white', textAlign: 'center' }]}>2 января</Text>
                    </View>
                    <View style={{ width: '90%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={styles.subTitle}>номер заказа</Text>
                                <Text style={styles.text400_16}>00009854</Text>
                            </View>
                            <View>
                                <Text style={styles.subTitle}>статус</Text>
                                <Text style={styles.btnText}>Выполнен</Text>
                            </View>
                        </View>
                        <Line />

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={styles.subTitle}>время заказа</Text>
                                <Text style={styles.text400_16}>16:33</Text>
                            </View>
                            <View>
                                <Text style={styles.subTitle}>время вывоза</Text>
                                <Text style={styles.text400_16}>20:37</Text>
                            </View>
                        </View>
                        <Line />
                        <View>
                            <Text style={styles.subTitle}>адрес</Text>
                            <Text style={styles.text400_16}>СНТ Солнечный Яр, ул. Доброгорская, д. 7</Text>
                        </View>
                        <Line />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.subTitle}>обслуживающая машина</Text>
                                <Text style={styles.text400_16}>А777АА194</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                                <EvilIcons name="image" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>


        </View>
    )
}

export default OrderScreen