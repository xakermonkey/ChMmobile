import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Appearance, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions, FlatList } from 'react-native'
import { Entypo, Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';

import axios from 'axios';
import { domain } from '../../domain';
import DriverHistoryOrder from '../../components/DriverHistoryOrder';

const HistoryIncomingOrders = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;


    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState("");
    const [refreshing, setRefreshing] = useState(false);


    const updateHistory = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(domain + "/history_list_order_driver", { headers: { "Authorization": "Token " + token } });
            setOrders(res.data.orders);
            setCurrentDate(res.data.orders[0].date_create.split(" ")[0])
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError(true);
        }
    }

    useFocusEffect(useCallback(() => {
        (async () => {
            await updateHistory();
        })();
    }, []))


    const onRefresh = async () => {
        setLoading(true);
        await updateHistory()
        setLoading(false);
    }

    const EmptyComponent = () => {
        return (<View style={{ alignItems: 'center', marginTop: '30%' }}>
            <Text style={styles.title}>Не выполнено ни одного заказа</Text>
        </View>)
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
                        <Text style={[{ width: '80%', textAlign: 'center' }, styles.title, colorScheme.themeTextStyle2,]}>История заказов</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('notifications_screen') }} activeOpacity={0.9}
                            style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                            <Ionicons name="notifications" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <View style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, width: '25%', alignSelf: 'center', marginTop: '6%' }}>
                <Text style={[styles.text400_16, { color: 'white', textAlign: 'center' }]}>{currentDate}</Text>
            </View>

            <FlatList
                data={orders}
                renderItem={({ ind, item }) => <DriverHistoryOrder item={item} styles={styles} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={<EmptyComponent />}
                refreshing={refreshing}
                onRefresh={onRefresh}
            // contentContainerStyle={{ paddingTop: "4%", height: "100%" }}
            // ListFooterComponent={<Line/>}
            />
        </View>
    )
}

export default HistoryIncomingOrders
