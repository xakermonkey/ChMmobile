import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Appearance, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
import styleScheme from '../style/colorSchemes'
import MapView from 'react-native-maps';
// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const MakingOrderScreen = ({ navigation }) => {

    const colorScheme = styleScheme()

    return (
        <View style={[styles.container, colorScheme.themeContainerStyle]} >
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <MapView style={styles.map} />

            <SafeAreaView style={{ position:'absolute', justifyContent:'space-between', alignSelf:'center' }}>
                <Text style={[styles.title, {textAlign:'center', color:'white'}]}>Заказать вывоз</Text>
                <View style={{ padding: '4%', backgroundColor: '#ffdecf', borderRadius: '20', width: '100%' }}>

                    <Text>СНТ</Text>
                    <TextInput style={{ backgroundColor: '#f2f2f3', borderRadius: 20, padding: '2%', height: 30 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '49%' }}>
                            <Text>Улица</Text>
                            <TextInput style={{ backgroundColor: '#f2f2f3', borderRadius: 20, padding: '2%', height: 30 }} />
                        </View>
                        <View style={{ width: '49%' }}>
                            <Text>Дом</Text>
                            <TextInput style={{ backgroundColor: '#f2f2f3', borderRadius: 20, padding: '2%', height: 30 }} />
                        </View>
                    </View>
                    <Text>Как Вас зовут?</Text>
                    <TextInput style={{ backgroundColor: '#f2f2f3', borderRadius: 20, padding: '2%', height: 30 }} placeholder='Фамилия Имя Отчество' />

                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Inter_600SemiBold', color: "white" }}>Определить автоматически</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default MakingOrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
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
})
