import React, { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Appearance, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native'
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
import styleScheme from '../style/colorSchemes'
import Carousel from 'react-native-snap-carousel';
import { Video, AVPlaybackStatus } from 'expo-av';
import * as WebBrowser from 'expo-web-browser';
import { useFocusEffect } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import axios from 'axios';
import { domain } from '../domain';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';

const MainScreen = ({ navigation }) => {


    useFocusEffect(() => {
        (async () => {
        
        })();
    })

    const colorScheme = styleScheme();


    const video = useRef(null);
    const [status, setStatus] = useState({});


    const [resultWeb, setResultWeb] = useState(null);
    const [viewOpacity, setViewOpacity] = useState(1);
    const [viewHeight, setViewHeight] = useState(90);
    const [visabilityView, setVisabilityView] = useState(true);
    const [imgSize, setImgSize] = useState(72);


    const carouselRef = useRef();
    const [selectIndex, setSelectIndex] = useState(0);
    const [cards, setCards] = useState([
        { title: "111" },
        { title: "222" },
        { title: "333" },

    ]
    )
    const renderItem = ({ item, index }) => {
        if (index == 0) {
            return (
                <View style={{
                    width: Dimensions.get('window').width * 0.9, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,
                }} >
                    <Video
                        ref={video}
                        style={{ height: 150, borderRadius: 20 }}
                        source={{
                            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                </View>
            )
        }
    }

    const openWeb = async (url) => {
        let result = await WebBrowser.openBrowserAsync(url);
        setResultWeb(result);
    }

    const onScroll = (event) => {
        if (event.nativeEvent.contentOffset.y <= 90){
            setVisabilityView(true);
        }else{
            setVisabilityView(false)
        }
        if (0 < event.nativeEvent.contentOffset.y && event.nativeEvent.contentOffset.y <= 90){
            setViewHeight(90 - event.nativeEvent.contentOffset.y);
            setViewOpacity((90 - event.nativeEvent.contentOffset.y) / 90.0);
        }
        if (0 < event.nativeEvent.contentOffset.y && event.nativeEvent.contentOffset.y <= 72){
            setImgSize(72 - event.nativeEvent.contentOffset.y);
        }
    }


    const Exit = async () => {
        await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "login_screen" }]
            }));
    }

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
                            <Ionicons name="notifications" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
            {visabilityView &&
            <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '6%' }, {height: viewHeight, opacity: viewOpacity}]}>
                <View style={{ padding: '2%', backgroundColor: '#f2f2f3', borderRadius: '20' }}>
                    <Image source={require('../assets/test_logo.png')} style={{ width: imgSize, height: imgSize }}></Image>
                </View>

                <View style={{ padding: '2%', backgroundColor: '#f2f2f3', borderRadius: '20', width: '65%' }}>
                    <Text style={{ fontFamily: 'Inter_600SemiBold', textAlign: 'center' }}>Чистый мир - это компания, которая заботится об экологии и безвозмездно поможет Вам с вывозом мусора</Text>
                </View>
            </View>}





            <ScrollView onScroll={onScroll} scrollEventThrottle={1}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '4%' }}>
                    <View>
                        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Ваш последний заказ</Text>
                        <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>что было последний раз</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="question" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: '4%' }}>
                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>У Вас еще не было заказов</Text>
                </View>

                <View style={{ height: 1, backgroundColor: '#f2f2f3' }}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '4%' }}>
                    <View>
                        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Обучающие видео</Text>
                        <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>как сортировать мусор</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="question" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', marginTop: '2%' }}>
                    <Carousel
                        slideStyle={{ height: 160 }}
                        ref={carouselRef}
                        data={cards}
                        renderItem={renderItem}
                        sliderHeight={100}
                        itemHeight={100}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width * 0.9}
                    // onSnapToItem={obj => setSelectIndex(obj)}
                    />
                </View>

                <View style={{ height: 1, backgroundColor: '#f2f2f3' }}></View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '4%' }}>
                    <View>
                        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Что мы вывозим?</Text>
                        <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>какой вид материала представляет интерес</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="question" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true} style={{ height: 130 }}>
                    <TouchableOpacity activeOpacity={0.9} style={{
                        width: 100, height: 120, backgroundColor: '#5e6f64', borderRadius: 20, padding: '5%', marginLeft: 15, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                    }}>
                        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 15, color: '#fff' }}>Металл</Text>
                        <Image source={require('../assets/items/metal.png')} style={{ height: 120, width: 120, left: 5 }} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={{
                        width: 100, height: 120, backgroundColor: '#5e6f64', borderRadius: 20, padding: '5%', marginLeft: 15, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                    }}>
                        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 15, color: '#fff' }}>Картон</Text>
                        <Image source={{ uri: 'https://catherineasquithgallery.com/uploads/posts/2021-03/1614576345_19-p-korobka-na-belom-fone-19.png' }} style={{ height: 100, width: 100, left: 5 }} resizeMode='contain' />
                    </TouchableOpacity>
                </ScrollView>

                <View style={{ height: 1, backgroundColor: '#f2f2f3' }}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '4%' }}>
                    <View>
                        <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Мы в соцсетях</Text>
                        <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>следите за самыми актуальными новостями</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="question" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: '4%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#f2f2f3', padding: '2%', borderRadius: 20 }}>
                        <TouchableOpacity onPress={() => {openWeb("https://telegram.org/")}} activeOpacity={0.8}>
                            <Image source={require('../assets/icons/tg.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {openWeb("https://www.whatsapp.com/?lang=ru")}} activeOpacity={0.8}>
                            <Image source={require('../assets/icons/wa.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {openWeb("https://www.viber.com/ru/")}} activeOpacity={0.8}>
                            <Image source={require('../assets/icons/vib.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {openWeb("https://vk.com/feed")}} activeOpacity={0.8}>
                            <Image source={require('../assets/icons/vk.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {openWeb("https://ok.ru/")}} activeOpacity={0.8}>
                            <Image source={require('../assets/icons/ok.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.9} style={{ padding: '4%' }} onPress={Exit}>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>Выход</Text>
                </TouchableOpacity>
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default MainScreen

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
