import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Appearance, useColorScheme, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { Ionicons } from '@expo/vector-icons';
import { domain } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

import styleScheme from '../style/colorSchemes'
import { colors } from '../style/colors';
import GeometryBackground from '../components/GeometryBackground';
import Line from '../components/Line';


const CodeScreen = ({ navigation, route }) => {
    const [code, setCode] = useState('');
    const [verify, setVerify] = useState(true);

    const colorScheme = styleScheme()
    const styles = colorScheme.styles;
    
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
        <SafeAreaView style={[colorScheme.themeContainerStyle, { flex: 1 }]} >
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <View style={{ alignItems: 'center' }}>
                <Text style={[styles.title, {marginTop:'10%'}]}>Код из СМС</Text>
                <Text style={styles.subTitle} >Введите код из сообщения,</Text>
                <Text style={styles.subTitle} >отправленного на номер</Text>
                <Text style={styles.subTitle} >{route.params.login}</Text>
            </View>
            <View style={{ justifyContent: 'center', marginTop: '10%' }}>
                <TextInput keyboardType='number-pad' maxLength={4} textContentType='oneTimeCode' autoFocus style={[ verify ? styles.title : { color: "#9B0000" }, {fontSize:32, textAlign:'center'}]}
                    onChangeText={(code) => Click2(code)}
                />
            </View>
        </SafeAreaView>
    )
}

export default CodeScreen
