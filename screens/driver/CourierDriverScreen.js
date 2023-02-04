import React, { useCallback, useState, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Image, Text, TouchableOpacity, View, ScrollView, Modal } from 'react-native'
import { Entypo, EvilIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { Camera, CameraType } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';

import axios from 'axios';
import { domain } from '../../domain';

const CourierDriver = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const [selectedLanguage, setSelectedLanguage] = useState();

    const [setState1, setState] = useState();
    var radio_props = [
        { label: 'Сетка 01', value: 0 },
        { label: 'Сетка 02', value: 1 }
    ];

    const cameraRef = useRef();
    const [modalVisible, setModalVisible] = useState(false);

    const [date, setDate] = useState(new Date());
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const changeGrid = async () => {
        setLoading(true);
        // navigation.setOptions({
        //     headerBackVisible: false,
        //     gestureEnabled: false
        // });
        const token = await AsyncStorage.getItem("token");
        const data = new FormData();
        data.append("date", date.toLocaleString());
        data.append("typeOperation", selectedLanguage);
        data.append('file', img);
        try {
            const res = await fetch(domain + "/change_grid", {
                method: "POST",
                body: data,
                headers: {
                    "Authorization": "Token " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
            const ret = await res.json();
            Alert.alert("Успех", "Событие успешно сохранено");
        }catch(err){
            console.log(err);
        }
    }

    const takePhoto = async () => {
        // console.log(await cameraRef.current.getAvailablePictureSizesAsync());
        const result = await cameraRef.current.takePictureAsync({ quality: 0.1 });
        let H = (result.height / 4).toFixed(0);
        let W = (result.width / 4).toFixed(0);
        const img = await ImageManipulator.manipulateAsync(result.uri,
            [
                { resize: { height: parseInt(H), width: parseInt(W) } },
                // {crop: {height: 1000, width: 1000, originX: (W/2).toFixed(0)-500, originY: (H/2).toFixed(0) - 500 }}

            ]);

        let shir = img.uri.split(".")
        shir = shir[shir.length - 1]
        const obj = {
            uri: img.uri,
            type: 'image/' + shir,
            name: `img.${shir}`
        }
        setImg(obj)
        setModalVisible(false);
    }

    const renderImg = () => {
        return (<TouchableOpacity onPress={() => setImg(null)} style={{ height: 72, width: 72, marginTop: 10}}>
            <Image source={{uri: img.uri}} style={{ height: 72, width: 72, borderRadius: 15}} width={72} height={72} />
        </TouchableOpacity>)
    }

    const clickTakePhoto = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setModalVisible(true);
    }

    const renderTakePhoto = () => {
        return (
            <TouchableOpacity onPress={clickTakePhoto} activeOpacity={0.6} style={{ flexDirection: 'row', padding: '4%', backgroundColor: '#f2f2f3', borderRadius: '20', alignItems: 'center', marginTop: '4%' }}>
                <EvilIcons name="image" size={32} color="black" />
                <View style={{ marginLeft: '4%' }}>
                    <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>Сделать фото</Text>
                    <Text style={styles.subTitle}>Макс. размер фото 10mb</Text>
                </View>
            </TouchableOpacity>)
    }

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

            <Modal
                animationType="slide"
                //animationInTiming = {13900}
                // transparent={true}
                visible={modalVisible}
                animationOut = "slide"
                swipeDirection="down"

            >

                <Camera ref={cameraRef} style={{ flex: 1 }} type='back'>
                    <TouchableOpacity onPress={takePhoto} style={{ width: 60, height: 60, borderRadius: 50, borderColor: "white", borderWidth: 5, position: 'absolute', bottom: 50, left: "42%" }} ></TouchableOpacity>
                </Camera>
            </Modal>

            <ScrollView >
                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Дата и время</Text>
                    <Text style={styles.subTitle}>выставляются автоматически</Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>21:18 19.01.2023г.</Text>
                    </View>
                </View>

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Выберите сетку</Text>
                    <Text style={styles.subTitle}>доступные сетки</Text>
                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <RadioForm
                            buttonColor={'#549D41'}
                            selectedButtonColor={'#549D41'}
                            radio_props={radio_props}
                            initial={0}
                            onPress={(value) => { setState({ value: value }) }} />
                    </View>
                </View>



                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Сделать фото сетки</Text>
                    <Text style={styles.subTitle}>сфотографируйте сетку</Text>
                    {img ? renderImg() : renderTakePhoto()}
{/* 
                    <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: 'row', padding: '4%', backgroundColor: '#f2f2f3', borderRadius: '20', alignItems: 'center', marginTop: '4%' }}>
                        <EvilIcons name="image" size={32} color="black" />
                        <View style={{ marginLeft: '4%' }}>
                            <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>Сделать фото</Text>
                            <Text style={styles.subTitle}>Макс. размер фото 10mb</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>

                <View style={{ padding: '4%' }}>
                    <TouchableOpacity onPress={changeGrid} activeOpacity={0.95} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5 name="trash-restore-alt" size={24} color="white" />
                        <Text style={[styles.text400_16, {marginLeft:'4%'}]}>Отчистить</Text>
                    </TouchableOpacity>
                </View>

                <Line />

                {/* <TouchableOpacity activeOpacity={0.9} style={{ padding: '4%' }}>
                    <Text style={styles.subTitle}>Выход</Text>
                </TouchableOpacity> */}

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Замечания клиентов</Text>
                    <Text style={styles.subTitle}>эти заказы от клиентов, которые считают, что сетка заполнена</Text>

                    <View style={{ padding: '4%', backgroundColor: '#f2f2f3', borderRadius: '20', marginTop: '4%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.subTitle}>от кого</Text>
                                <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>+79999999999</Text>
                            </View>
                            <View>
                                <Text style={styles.subTitle}>статус</Text>
                                <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>В обработке</Text>
                            </View>
                        </View>
                        <Line />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.subTitle}>местоположение</Text>
                                <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>СНТ Солнечный Яр</Text>
                            </View>
                            <View>
                                <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                                    <Entypo name="location-pin" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Line />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#FC2F2F', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "white" }}>Отклонить</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#ACACAC', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "white" }}>Фото</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "white" }}>Принять</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ height: 100 }}></View>

            </ScrollView>
        </View>
    )
}

export default CourierDriver

