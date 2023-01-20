import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, ScrollView, Image, View } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
import styleScheme from '../style/colorSchemes'
// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const IncomingOrders = ({ navigation }) => {

    const colorScheme = styleScheme()

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{
                backgroundColor: '#ffdecf', height: '15%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
            }}>
                <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
                <SafeAreaView style={{}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '3%' }}>
                        {/* <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 24, color: '#fff' }}>Чистый мир</Text> */}
                        {/* <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, width: '45%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Entypo name="location-pin" size={24} color="white" />
                            <Text style={{ fontFamily: 'Inter_500Medium', color: "white" }}>СНТ Солнечный Яр</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="notifications" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>


            <ScrollView style={{ marginTop: '4%' }}>

            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, textAlign: 'center', marginTop: '6%' }}>Новые заказы</Text>


            <View style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, width: '25%', alignSelf: 'center', marginTop: '6%' }}>
                <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 12, color: 'white', textAlign: 'center' }}>2 января</Text>
            </View>
            <View style={{ padding: '4%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'4%' }}>
                    {/* <View style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                    }}>
                        <Image source={{ uri: 'https://kartinkin.net/uploads/posts/2022-03/1646175252_15-kartinkin-net-p-kartinki-musora-16.jpg' }} style={{
                            width: 120, height: 120, borderRadius: 20,
                        }} />
                    </View> */}
                    <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>номер заказа</Text>
                                <Text style={{ fontFamily: 'Inter_500Medium', color: 'black', fontSize: 16 }}>0000631</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>статус</Text>
                                <Text style={{ fontFamily: 'Inter_500Medium', color: 'black', fontSize: 16 }}>В обработке</Text>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#f2f2f3' }}></View>

                        <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>заказчик</Text>
                        <Text style={{ fontFamily: 'Inter_500Medium', color: 'black', fontSize: 16 }}>Иванова Светлана Андреевна</Text>
                        <View style={{ height: 1, backgroundColor: '#f2f2f3' }}></View>

                        <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>номер телефона</Text>
                        <Text style={{ fontFamily: 'Inter_500Medium', color: 'black', fontSize: 16 }}>+79615670198</Text>
                        <View style={{ height: 1, backgroundColor: '#f2f2f3' }}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                            <View>
                                <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>местоположение</Text>
                                <Text style={{ fontFamily: 'Inter_500Medium', color: 'black', fontSize: 16 }}>СНТ Солнечный Яр</Text>
                            </View>
                            <View>
                                <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', height:35, width:35, padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Entypo name="location-pin" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ height: 1, backgroundColor: '#f2f2f3' }}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>улица</Text>
                                <Text style={{ fontFamily: 'Inter_500Medium', color: 'black', fontSize: 16 }}>Доброгорская</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>дом</Text>
                                <Text style={{ fontFamily: 'Inter_500Medium', color: 'black', fontSize: 16 }}>7</Text>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#f2f2f3' }}></View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:'2%' }}>
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#632A2A', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Inter_600SemiBold', color: "white" }}>Отклонить</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Inter_600SemiBold', color: "white" }}>Фото</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Inter_600SemiBold', color: "white" }}>Принять</Text>
                            </TouchableOpacity>
                        </View>



                    </View>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default IncomingOrders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
        // alignItems: 'center',
        // justifyContent: 'flex-start',
    },
    title: {
        marginTop: 24,
        fontSize: 24,
        fontFamily: "Inter_800ExtraBold",
    },
    subtext: {
        marginTop: 8,
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 24,
    },
    subsubtext: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 24,
    },
    inputText: {
        // flex:1,
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        // marginTop: '25%'
    },
    keyboard: {

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 24,
        // paddingHorizontal:'15%'
        width: 300
    },
    btn: {
        width: 72,
        height: 72,
        borderRadius: 72,
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft:24
    },
    num: {
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold",
    },



    lightContainer: {
        color: "#0C0C0D7A",
    },
    darkContainer: {
        backgroundColor: '#17171C',
    },
    lightText: {
        color: "#0C0C0D",
    },
    darkText: {
        color: '#F2F2F3',
    },
    lightSubText: {
        color: "#0C0C0D7A",
    },
    darkSubText: {
        color: '#F2F2F37A',
    },
    lightContainerSelect: {
        backgroundColor: "#F5CB57"
    },
    darkContainerSelect: {
        backgroundColor: "#F2F2F31F"
    },



})
