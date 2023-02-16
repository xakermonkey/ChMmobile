import React, { useCallback, useState, useRef, useLayoutEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions, Platform, Alert } from 'react-native'
import { Entypo, Ionicons, EvilIcons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { Video, AVPlaybackStatus } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

import QuestionButton from '../../components/QuestionButton';
import CleanWorld from '../../components/CleanWorld';
import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain, domain_domain } from '../../domain';
import * as Location from "expo-location";

const MainScreen = ({ navigation }) => {

    const [lastOrder, setLastOrder] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [nearestGrid, setNearesGrid] = useState([]);
    const [address, setAddress] = useState("");
    const [showAddress, setShowAddress] = useState(true);
    const [locationPermission, setLocationPermission] = useState(false);


    useLayoutEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert("ALARM", 'Permission to access location was denied');
                    setShowAddress(false);
                    setLocationPermission(false);
                }

        })();
    }, [address, locationPermission])

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                let location = null;
                const token = await AsyncStorage.getItem("token");
                if (locationPermission){
                    location = await Location.getLastKnownPositionAsync({});
                    // const ad = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
                    // setAddress(ad[0].name);
                }
                const res = await axios.get(domain + "/main_user", {
                    headers: {
                        "Authorization": "Token " + token
                    },
                    params: {
                        lat: location?.coords.latitude,
                        lon: location?.coords.longitude
                    }
                });
                setLastOrder(res.data.order);
                setMaterials(res.data.materials);
                if (res.data.trash_point != null) {
                    setAddress(res.data.trash_point.name);
                } else if (location != null) {
                    const ad = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
                    setAddress(ad[0].name);
                }
                if (res.data.grids != null){
                    setNearesGrid(res.data.grids);
                }
                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setError(true);
            }
        })();
    }, [locationPermission]))

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const video = useRef(null);
    const [status, setStatus] = useState({});

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

    const makeCall = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${+78127406618}';
        } else {
            phoneNumber = 'telprompt:${+78127406618}';
        }

        Linking.openURL(phoneNumber);
    };

    const nearGrid = () => {
        return (<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ height: 120, marginBottom: '4%' }}>
            {nearestGrid.map(obj => {
                return (
                    <TouchableOpacity key={obj.id} onPress={() => { navigation.navigate('about_grid_screen') }} activeOpacity={0.9} style={{
                        width: 120, height: 120, borderRadius: 20, marginLeft: 15, backgroundColor: '#C7F5FF'
                    }}>
                        <Text style={[styles.title, colorScheme.themeTextStyle2, { top: '10%', left: '10%' }]}>Металл</Text>
                        <Image source={require('../../assets/items/metal.png')} style={{ height: 120, width: 120 }} resizeMode='contain' />
                    </TouchableOpacity>)
            })}

        </ScrollView>)
    }

    const notFound = (text) => {
        return (<View style={{ padding: '4%' }}>
            <Text style={styles.title}>{text}</Text>
        </View>)
    }

    const renderMaterial = () => {
        return (<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ height: 120, marginBottom: '4%' }}>
            {materials.map((obj) => {
                return (<TouchableOpacity key={obj.id} activeOpacity={0.9} style={{
                    width: 120, height: 120, borderRadius: 20, marginLeft: 15, backgroundColor: '#C7F5FF'
                }}>
                    <Text style={[styles.title, colorScheme.themeTextStyle2, { top: '10%', left: '10%' }]}>{obj.type}</Text>
                    <Image source={{ uri: domain_domain + obj.icon }} style={{ height: 120, width: 120 }} resizeMode='contain' />
                </TouchableOpacity>)
            })}
        </ScrollView>)
    }

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]}>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <GeometryBackground />
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <SafeAreaView >
                    <View style={[styles.rowBetweenCenter, { padding: '3%' }]}>
                        {showAddress ? <TouchableOpacity onPress={() => { navigation.navigate('location_screen') }} activeOpacity={0.9} style={[styles.btnHeader, styles.rowBetweenCenter]}>
                            <Entypo name="location-pin" size={24} color={colors.greenText.color} />
                            <Text style={[styles.btnText]}>{address}</Text>
                        </TouchableOpacity> : <View></View>}
                        <TouchableOpacity onPress={() => { navigation.navigate('notifications_screen') }} activeOpacity={0.9} style={[styles.roundBtn, styles.centerCenter]}>
                            <Ionicons name="notifications" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView>
                <CleanWorld />

                <View style={[styles.rowBetweenCenter, { padding: '4%' }]}>
                    <View>
                        <Text style={styles.title}>Сетки рядом с Вами</Text>
                        <Text style={styles.subTitle}>узнайте что в них можно класть</Text>
                        <Text style={styles.subTitle}>или сообщите нам об их заполнении</Text>
                    </View>
                    <QuestionButton />
                </View>
                {nearestGrid.length != 0 ? nearGrid() : notFound("Нет сеток поблизости")}

                <Line />

                <View style={[styles.rowBetweenCenter, { padding: '4%' }]}>
                    <View>
                        <Text style={styles.title}>Ваш последний заказ</Text>
                        <Text style={styles.subTitle}>что было последний раз</Text>
                    </View>
                    <QuestionButton />
                </View>
                {lastOrder == null ? notFound("У Вас еще не было заказов") :
                    <View style={[styles.rowBetweenCenter, { padding: '4%' }]}>
                        <Text style={styles.title}>Заказ номер {"0".repeat(5 - lastOrder.id.toString().length) + lastOrder.id}</Text>
                        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                            <EvilIcons name="image" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                }


                <Line />

                <View style={[styles.rowBetweenCenter, { padding: '4%' }]}>
                    <View>
                        <Text style={styles.title}>Обучающие видео</Text>
                        <Text style={styles.subTitle}>как сортировать мусор</Text>
                    </View>
                    <QuestionButton />

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

                <Line />

                <View style={[styles.rowBetweenCenter, { padding: '4%' }]}>
                    <View>
                        <Text style={styles.title}>Что мы вывозим?</Text>
                        <Text style={styles.subTitle}>какой вид материала представляет интерес</Text>
                    </View>
                    <QuestionButton />

                </View>
                {materials.length != 0 ? renderMaterial() : notFound("Приходите позже")}
                <Line />

                <View style={[styles.rowBetweenCenter, { padding: '4%' }]}>
                    <View>
                    </View>

                </View>
                <View style={{ marginBottom: '10%' }}>
                    <Text style={[styles.title, { textAlign: 'center' }]}>По всем вопрсам</Text>
                    <TouchableOpacity onPress={makeCall}>
                        <Text style={[styles.title, { textAlign: 'center' }]}>+ 7 812 740-66-18</Text>
                    </TouchableOpacity>
                    <Text style={[styles.title, { textAlign: 'center' }]}>Мы в социальных сетях</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '20%', marginTop: '5%' }}>
                        <TouchableOpacity onPress={() => { openWeb("https://telegram.org/") }} activeOpacity={0.9}>
                            <Image source={require('../../assets/icons/tg.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { openWeb("https://www.whatsapp.com/?lang=ru") }} activeOpacity={0.9}>
                            <Image source={require('../../assets/icons/wa.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { openWeb("https://www.viber.com/ru/") }} activeOpacity={0.9}>
                            <Image source={require('../../assets/icons/vib.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { openWeb("https://vk.com/feed") }} activeOpacity={0.9}>
                            <Image source={require('../../assets/icons/vk.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { openWeb("https://ok.ru/") }} activeOpacity={0.9}>
                            <Image source={require('../../assets/icons/ok.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default MainScreen
