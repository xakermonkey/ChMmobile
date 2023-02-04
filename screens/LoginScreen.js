import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Appearance, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
import axios from 'axios';
import { domain } from '../domain';
import * as Haptics from 'expo-haptics';
// import { Ionicons } from '@expo/vector-icons';

import styleScheme from '../style/colorSchemes'
import { colors } from '../style/colors';
import GeometryBackground from '../components/GeometryBackground';
import Line from '../components/Line';

const LoginScreen = ({ navigation }) => {

    const [number, setNumber] = useState('+7');
    const [mask, setMask] = useState(["+", "7", " ", '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]);
    const [maskNumber, setMaskNumber] = useState('+7');

    const colorScheme = styleScheme()
    const styles = colorScheme.styles;
    
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
        <SafeAreaView style={[colorScheme.themeContainerStyle, { flex: 1 }]} >
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <View style={{ flex: 0, alignItems:'center' }}>
                <Text style={[styles.title, {marginTop:'10%'}]}>Вход</Text>
                <Text style={styles.subTitle} >Введите номер телефона, </Text>
                <Text style={styles.subTitle} >чтобы войти в существующий аккаунт </Text>
                <Text style={styles.subTitle} >или создать новый</Text>
            </View>

            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                <MaskInput mask={mask} style={[styles.title, {fontSize:32}]} showSoftInputOnFocus={false} value={number} />
            </View>

            <View style={{
                bottom: 20,
                // position: 'absolute',
                alignItems: 'center',
                flex: 0,
                // backgroundColor:'#0f0'
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('license')}>
                    <Text style={[{ paddingHorizontal: 80, textAlign: 'center' }, styles.subTitle, colorScheme.themeSubTextStyle]} >Вводя свой номер телефона вы соглашаетесь с <Text style={[styles.text400_16, colorScheme.themeSubTextStyle]} >Правилами</Text></Text>
                </TouchableOpacity>
                <View style={styles.keyboard}>
                    <View style={styles.row} >
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#549D41'}]} activeOpacity={0.5} onPress={() => Click('1')}  ><Text style={[styles.title]} >1</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#549D41'}]} activeOpacity={0.5} onPress={() => Click('2')}><Text style={[styles.title]}>2</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#549D41'}]} activeOpacity={0.5} onPress={() => Click('3')}><Text style={[styles.title]}>3</Text></TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#549D41'}]} activeOpacity={0.5} onPress={() => Click('4')}><Text style={[styles.title]}>4</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#549D41'}]} activeOpacity={0.5} onPress={() => Click('5')}><Text style={[styles.title]}>5</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#549D41'}]} activeOpacity={0.5} onPress={() => Click('6')}><Text style={[styles.title]}>6</Text></TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#549D41'}]} activeOpacity={0.5} onPress={() => Click('7')}><Text style={[styles.title]}>7</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#549D41'}]} activeOpacity={0.5} onPress={() => Click('8')}><Text style={[styles.title]}>8</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#549D41'}]} activeOpacity={0.5} onPress={() => Click('9')}><Text style={[styles.title]}>9</Text></TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerStyle]} ><Text></Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: '#549D41'}]} activeOpacity={0.5} onPress={() => Click('0')}><Text style={[styles.title]}>0</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, colorScheme.themeContainerStyle]} activeOpacity={0.5} onPress={() => Click('del')}><Ionicons name="backspace-outline" size={28} color={colorScheme.colorScheme === 'light' ? '#5e6f64' : '#F2F2F3'} /></TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen
