import React, { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { Entypo, EvilIcons, Ionicons } from '@expo/vector-icons';
import styleScheme from '../style/colorSchemes'
import { Picker } from '@react-native-picker/picker';


// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const CourierDriver = ({ navigation }) => {

    const colorScheme = styleScheme();

    const [selectedLanguage, setSelectedLanguage] = useState();

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
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, width: '45%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Entypo name="location-pin" size={24} color="white" />
                            <Text style={{ fontFamily: 'Inter_500Medium', color: "white" }}>СНТ Солнечный Яр</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Inter_600SemiBold', color: "white" }}>Подтвердить</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>


            <ScrollView style={{ marginTop: '4%' }}>
                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, textAlign: 'center' }}>Состояние сетки</Text>

                <View style={{ padding: '4%' }}>
                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Дата и время</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>выставляются автоматически</Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <Text style={{ fontFamily: 'Inter_500Medium' }}>21:18 19.01.2023г.</Text>
                    </View>
                </View>

                <View style={{ padding: '4%' }}>
                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Сделать фото сетки</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>сфотографируйте сетку</Text>

                    <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: 'row', padding: '4%', backgroundColor: '#f2f2f3', borderRadius: '20', alignItems: 'center', marginTop: '4%' }}>
                        <EvilIcons name="image" size={32} color="black" />
                        <View style={{ marginLeft: '4%' }}>
                            <Text style={{ fontFamily: 'Inter_500Medium' }}>Сделать фото</Text>
                            <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>Макс. размер фото 10mb</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: '4%' }}>

                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Состояние</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>выберите состояние сетки</Text>

                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Заполнена" value="Заполнена" />
                        <Picker.Item label="Очищена" value="Очищена" />
                    </Picker>
                </View>

                <TouchableOpacity activeOpacity={0.9} style={{ padding: '4%' }}>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>Выход</Text>
                </TouchableOpacity>

                <View style={{ height: 100 }}></View>

            </ScrollView>
        </View>
    )
}

export default CourierDriver

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
