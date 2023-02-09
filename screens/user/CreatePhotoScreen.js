import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Modal } from 'react-native'
import { Feather, EvilIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CameraType } from 'expo-camera';
import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { domain } from '../../domain';
import { CommonActions } from '@react-navigation/native';
// import axios from 'axios';

// import { Ionicons } from '@expo/vector-icons';

const CreatePhotoScreen = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const [selectedLanguage, setSelectedLanguage] = useState();
    const [img, setImg] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    const cameraRef = useRef();

    const takePhoto = async () => {
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

    useLayoutEffect(() => {
        (async () => {
            await Camera.requestCameraPermissionsAsync();
        })();
    }, [])

    const clickTakePhoto = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setModalVisible(true);
    }

    const completeCreated = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem("token");
            const location = await AsyncStorage.getItem("orderRegion");
            const data = new FormData();
            data.append("region", location);
            data.append('file', img);
            try {
                const res = await fetch(domain + "/create_order", {
                    method: "POST",
                    body: data,
                    headers: {
                        "Authorization": "Token " + token,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    }
                });
                const ret = await res.json();
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "order_completion_screen", params: { orderId: ret.order } }]
                    }));
            } catch (err) {
                console.log(err);
            }
            
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]}>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <SafeAreaView >
                    <View style={{ padding: '3%', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('making_order_screen') }} activeOpacity={0.9} style={{ width: 40, height: 40, backgroundColor: '#FFFFFF', padding: '2%', borderRadius: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <Feather name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '4%' }}>
                            <View style={{ height: 3, backgroundColor: '#549D41', marginRight: '3%', width: 50 }} />
                            <View style={{ height: 3, backgroundColor: '#549D41', marginRight: '3%', width: 50 }} />
                            <View style={{ height: 3, backgroundColor: '#f2f2f3', marginRight: '3%', width: 50 }} />
                        </View>
                        {img == null ? <View style={{ width: 40, height: 40}}></View> : <TouchableOpacity onPress={completeCreated} activeOpacity={0.9} style={{ width: 40, height: 40, backgroundColor: '#FFFFFF', padding: '2%', borderRadius: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="checkmark-sharp" size={24} color="black" />
                        </TouchableOpacity>}
                        
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <Modal
                animationType="slide"
                //animationInTiming = {13900}
                // transparent={true}
                visible={modalVisible}
                animationOut="slide"
                swipeDirection="down"
            >

                <Camera ref={cameraRef} style={{ flex: 1 }} type='back'>
                    <TouchableOpacity onPress={takePhoto} style={{ width: 60, height: 60, borderRadius: 50, borderColor: "white", borderWidth: 5, position: 'absolute', bottom: 50, left: "42%" }} ></TouchableOpacity>
                </Camera>
            </Modal>


            <ScrollView style={{ marginTop: '4%' }}>

                <View style={{ padding: '4%', alignItems: 'center' }}>
                    <Text style={styles.title}>{img == null ? "Сделайте фото мусора" : "Для удаления"}</Text>
                    <Text style={[styles.subTitle, { textAlign: 'center' }]}>{img == null ? "сфотографируйте мусор, который необходимо вывезти" : "нажмите на фотографию"}</Text>
                    {img == null ? <Image source={require('../../assets/items/trash_dump.png')} style={{ height: '120%', width: '100%' }} resizeMode='contain' /> :
                        <TouchableOpacity onPress={() => { setImg(null) }} style={{ height: 500, width: 500, marginTop: 10 }}>
                            <Image source={{ uri: img.uri }} style={{ height: '100%', width: '100%' }} resizeMode='contain' />
                        </TouchableOpacity>
                    }


                    {img == null && <TouchableOpacity activeOpacity={0.6} onPress={clickTakePhoto} style={{ flexDirection: 'row', padding: '4%', backgroundColor: '#f2f2f3', borderRadius: '20', alignItems: 'center', marginTop: '4%' }}>
                        <EvilIcons name="image" size={32} color="black" />
                        <View style={{ marginLeft: '4%' }}>
                            <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>Сделать фото</Text>
                            <Text style={styles.subTitle}>Макс. размер фото 10mb</Text>
                        </View>
                    </TouchableOpacity>}
                </View>

                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default CreatePhotoScreen
