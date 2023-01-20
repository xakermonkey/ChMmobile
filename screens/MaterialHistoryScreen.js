import React, { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Appearance, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native'
import { Entypo, EvilIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styleScheme from '../style/colorSchemes';
import { Picker } from '@react-native-picker/picker';


// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const MaterialHistoryScreen = ({ navigation }) => {

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
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                            onPress={async () => { navigation.navigate('add_material_screen'); }}
                        >
                            <AntDesign name="plus" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>



            <ScrollView style={{ marginTop: '4%' }}>
                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, textAlign: 'center' }}>История</Text>

                <View style={{ padding: '4%' }}>

                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Категория</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>выберите категорию сырья</Text>

                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Все" value="Все" />
                        <Picker.Item label="Стекло" value="Стекло" />
                        <Picker.Item label="Картон" value="Картон" />
                    </Picker>
                </View>

                <View style={{ height: 1, backgroundColor: '#f2f2f3', }}></View>

                <View style={{ padding: '4%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
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
                        </View>
                        <View style={{ marginLeft: '2%', width: '60%' }}>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>дата</Text>
                                    <Text style={{ fontFamily: 'Inter_500Medium', color: 'black', fontSize: 16 }}>16.01.23</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>время</Text>
                                    <Text style={{ fontFamily: 'Inter_500Medium', color: 'black', fontSize: 16 }}>20:37</Text>
                                </View>
                            </View>
                            <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>масса</Text>
                            <Text style={{ fontFamily: 'Inter_500Medium', color: 'black', fontSize: 16 }}>80 кг</Text>
                            <View style={{ height: 1, backgroundColor: '#f2f2f3' }}></View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.9} style={{ padding: '4%' }}>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>Выход</Text>
                </TouchableOpacity>
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default MaterialHistoryScreen

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
