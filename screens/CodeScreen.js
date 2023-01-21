import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Appearance, useColorScheme, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { Ionicons } from '@expo/vector-icons';
import { domain } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import styleScheme from '../style/colorSchemes'



const CodeScreen = ({ navigation, route }) => {

    const [code, setCode] = useState('');
    const [verify, setVerify] = useState(true);

    const colorScheme = styleScheme()

    // const Click = (num) => {
    //     if (num === 'del') {
    //         if (code.length > 0) {
    //             setCode(code.slice(0, -1));
    //         }
    //     } else {
    //         if (code.length < 4) {
    //             console.log('kdd')
    //             setCode(code + num);
    //             console.log(code)
    //         }
    //     }
    // };

    const Click2 = (code) => {
        
        if (code.length === 4) {
            (async () => {
                try {
                    const res = await axios.post(domain + "/set_code", { 'number': route.params.number, 'code': code })
                    await AsyncStorage.setItem("token", res.data.token);
                    await AsyncStorage.setItem("phone", route.params.login);
                    await AsyncStorage.setItem("phone_number", route.params.number);
                    await AsyncStorage.setItem("role", res.data.user.role)
                    if (res.data.user.role == "user"){
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "main_navigator", params: { from: "code" } }]
                            }));
                    }
                    else if(res.data.user.role == "factory_man"){
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "factory_navigator", params: { from: "code" } }]
                            }));
                    }
                    else if(res.data.user.role == "driver"){
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "courier_driver_navigator", params: { from: "code" } }]
                            }));
                    }
                }
                catch (err) {
                    setVerify(false);
                }
            })();
        }else{
            setVerify(true);
        }
        
    }


    return (
        <SafeAreaView style={[styles.container, colorScheme.themeContainerStyle]} >
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <View style={{ alignItems: 'center' }}>
                <Text style={[styles.title, { color: '#0C0C0D' }]}>Код из СМС</Text>
                <Text style={[styles.subtext, colorScheme.themeSubTextStyle]} >Введите код из сообщения,</Text>
                <Text style={[styles.subsubtext, colorScheme.themeSubTextStyle]} >отправленного на номер</Text>
                <Text style={[styles.subsubtext, colorScheme.themeSubTextStyle]} >{route.params.login}</Text>
            </View>
            <View style={{ justifyContent: 'center', marginTop: '10%' }}>
                <TextInput keyboardType='number-pad' maxLength={4} textContentType='oneTimeCode' autoFocus style={[styles.inputText, verify ? { color: '#0C0C0D' } : { color: "#9B0000" }]}
                    onChangeText={(code) => Click2(code)}
                />
            </View>
        </SafeAreaView>
    )
}

export default CodeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        // marginTop: '25%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 24,
        width: 300
    },
    btn: {
        width: 72,
        height: 72,
        borderRadius: 72,
        alignItems: 'center',
        justifyContent: 'center'
    },
    num: {
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold",
    },
})