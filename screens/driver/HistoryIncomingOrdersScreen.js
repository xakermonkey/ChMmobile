import React, { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Appearance, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native'
import { Entypo, Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';

// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const HistoryIncomingOrders = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const [selectedLanguage, setSelectedLanguage] = useState();

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
                            <Text style={styles.text400_16}>Выполнен</Text>
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
                </View>
            </ScrollView>
        </View>
    )
}

export default HistoryIncomingOrders
