import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Appearance, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
import styleScheme from '../style/colorSchemes'
import axios from 'axios';
import { domain } from '../domain';
import * as Haptics from 'expo-haptics';
// import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {

    const [number, setNumber] = useState('+7');
    const [mask, setMask] = useState(["+", "7", " ", '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]);
    const [maskNumber, setMaskNumber] = useState('+7');

    const colorScheme = styleScheme()

    const Click = (num) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        if (num === 'del') {
            if (number.length > 2) {
                setNumber(number.slice(0, -1));
            }
        } else {
            setNumber(number + num);
        }
    };

    useEffect(() => {
        if (number.length === '+7'.length + 10) {
            const { masked, unmasked, obfuscated } = formatWithMask({
                text: number,
                mask: mask,
            });
            axios.post(domain + "/login", { "number": number })
                .then((res) => {
                    if (res.data.status){
                        navigation.navigate('code_screen', { 'login': masked, 'number': number })
                    }
                })

        }
    }, [number, mask])


    return (
        <SafeAreaView style={[styles.container, colorScheme.themeContainerStyle]} >
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <View style={{ flex: 0, alignItems:'center' }}>
                <Text style={[styles.title, {color:'#0C0C0D'}]}>Вход</Text>
                <Text style={[styles.subtext, colorScheme.themeSubTextStyle]} >Введите номер телефона, </Text>
                <Text style={[styles.subsubtext, colorScheme.themeSubTextStyle]} >чтобы войти в существующий аккаунт </Text>
                <Text style={[styles.subsubtext, colorScheme.themeSubTextStyle]} >или создать новый</Text>
            </View>

            <View style={{ flex:1, justifyContent:'center' }}>
                <MaskInput mask={mask} style={[styles.inputText, {color:'#0C0C0D'}]} showSoftInputOnFocus={false} value={number} />
            </View>

            <View style={{
                bottom: 20,
                // position: 'absolute',
                alignItems: 'center',
                flex: 0,
                // backgroundColor:'#0f0'
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('license')}>
                    <Text style={[{ fontFamily: 'Inter_400Regular', fontSize: 14, paddingHorizontal: 80, textAlign: 'center' }, colorScheme.themeSubTextStyle]} >Вводя свой номер телефона вы соглашаетесь с <Text style={[{ fontFamily: 'Inter_700Bold' }, colorScheme.themeSubTextStyle]} >Правилами</Text></Text>
                </TouchableOpacity>
                <View style={styles.keyboard}>
                    <View style={styles.row} >
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('1')}  ><Text style={[styles.num, colorScheme.themeTextStyle]} >1</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('2')}><Text style={[styles.num, colorScheme.themeTextStyle]}>2</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('3')}><Text style={[styles.num, colorScheme.themeTextStyle]}>3</Text></TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('4')}><Text style={[styles.num, colorScheme.themeTextStyle]}>4</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('5')}><Text style={[styles.num, colorScheme.themeTextStyle]}>5</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('6')}><Text style={[styles.num, colorScheme.themeTextStyle]}>6</Text></TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('7')}><Text style={[styles.num, colorScheme.themeTextStyle]}>7</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('8')}><Text style={[styles.num, colorScheme.themeTextStyle]}>8</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('9')}><Text style={[styles.num, colorScheme.themeTextStyle]}>9</Text></TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerStyle]} ><Text></Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerSelectStyle]} activeOpacity={0.5} onPress={() => Click('0')}><Text style={[styles.num, colorScheme.themeTextStyle]}>0</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerStyle]} activeOpacity={0.5} onPress={() => Click('del')}><Ionicons name="backspace-outline" size={28} color={colorScheme.colorScheme === 'light' ? '#5e6f64' : '#F2F2F3'} /></TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

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
