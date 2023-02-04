import React, { useCallback, useState, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions, Platform } from 'react-native'
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
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

import axios from 'axios';
import { domain } from '../../domain';

const MainScreen = ({ navigation }) => {

    const [lastOrder, setLastOrder] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const res = await axios.get(domain + "/main_user", {
                    headers: {
                        "Authorization": "Token " + token
                    }
                });
                setLastOrder(res.data.order);
                setMaterials(res.data.materials);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setError(true);
            }
        })();
    }, []))

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


    const Exit = async () => {
        await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "login_screen" }]
            }));
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

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]}>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <GeometryBackground />
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <SafeAreaView >
                    <View style={[styles.rowBetweenCenter, { padding: '3%' }]}>
                        <TouchableOpacity onPress={() => { navigation.navigate('location_screen') }} activeOpacity={0.9} style={[styles.btnHeader, styles.rowBetweenCenter]}>
                            <Entypo name="location-pin" size={24} color={colors.greenText.color} />
                            <Text style={styles.btnText}>СНТ Солнечный Яр</Text>
                        </TouchableOpacity>
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
                <ScrollView horizontal={true} style={{ height: 120, marginBottom: '4%' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('about_grid_screen') }} activeOpacity={0.9} style={{
                        width: 120, height: 120, borderRadius: 20, marginLeft: 15, backgroundColor: '#C7F5FF'
                    }}>
                        <Text style={[styles.title, colorScheme.themeTextStyle2, { top: '10%', left: '10%' }]}>Металл</Text>
                        <Image source={require('../../assets/items/metal.png')} style={{ height: 120, width: 120 }} resizeMode='contain' />
                    </TouchableOpacity>
                </ScrollView>

                <View style={[styles.rowBetweenCenter, { padding: '4%' }]}>
                    <View>
                        <Text style={styles.title}>Ваш последний заказ</Text>
                        <Text style={styles.subTitle}>что было последний раз</Text>
                    </View>
                    <QuestionButton />
                </View>
                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>У Вас еще не было заказов</Text>
                </View>

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
                <ScrollView horizontal={true} style={{ height: 120, marginBottom: '4%' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{
                        width: 120, height: 120, borderRadius: 20, marginLeft: 15, backgroundColor: '#C7F5FF'
                    }}>
                        <Text style={[styles.title, colorScheme.themeTextStyle2, { top: '10%', left: '10%' }]}>Металл</Text>
                        <Image source={require('../../assets/items/metal.png')} style={{ height: 120, width: 120 }} resizeMode='contain' />
                    </TouchableOpacity>
                </ScrollView>

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
