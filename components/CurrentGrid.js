import { colors } from '../style/colors';
import React, {useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Alert, Modal, Image, SafeAreaView } from 'react-native'
import GeometryBackground from './GeometryBackground';
import Line from './Line';
import * as Location from "expo-location";
import { Ionicons, Entypo, EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import { domain, domain_domain } from '../domain';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { add } from 'react-native-reanimated';


const CurrentGrid = ({ item, colorScheme, setLoading, setAcceptEntry }) => {

    const styles = colorScheme.styles;
    const [modalVisible, setModalVisible] = useState(false);

    const [img, setImg] = useState(null);
    const [address, setAddress] = useState("");
    const [date, setDate] = useState(new Date())
    const [uri, setUri] = useState(null);

    const cameraRef = useRef();
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

    
    const changeGrid = async () => {
        setLoading(true);
        // navigation.setOptions({
        //     headerBackVisible: false,
        //     gestureEnabled: false
        // });
        const token = await AsyncStorage.getItem("token");
        const data = new FormData();
        data.append('file', img);
        data.append("id", item.id);
        try {
            const res = await fetch(domain + "/complete_entry", {
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
            setLoading(false)
            setAcceptEntry(null);
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

    useEffect(() => {
        (async () => {
            const add = await Location.reverseGeocodeAsync({ latitude: item.grid.location.coordinates[1], longitude: item.grid.location.coordinates[0] })
            setAddress(add[0].name);
        })();

    }, [])

    return (
        <View >
            <View style={{ padding: '4%' }}>
                <Text style={styles.title}>Дата и время</Text>
                <Text style={styles.subTitle}>выставляются автоматически</Text>

                <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                    <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>{date.toLocaleString()}</Text>
                </View>
            </View>
            <View style={{ padding: '4%' }}>
                <Text style={styles.title}>Пользователь</Text>
                <Text style={styles.subTitle}>который сообщил о заполении сетки</Text>

                <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                    <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>{item.user.username}</Text>
                </View>
            </View>
            <View style={{ padding: '4%' }}>
                <Text style={styles.title}>Местоположение</Text>
                <Text style={styles.subTitle}>сетки</Text>

                <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                    <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>{address}</Text>
                </View>
            </View>
            <Modal
                animationType="slide"
                //animationInTiming = {13900}
                // transparent={true}
                visible={modalVisible}
                animationOut="slide"
                swipeDirection="down"
            >
                {/* <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ width: 60, height: 60 }} ><Text style={{ color: 'black' }}>X</Text></TouchableOpacity>
                    <Image source={{ uri: domain_domain + uri }} style={{ height: '90%', width: '90%', borderRadius: 5 }} resizeMode='contain' />
                </SafeAreaView> */}
                <Camera ref={cameraRef} style={{ flex: 1 }} type='back'>
                    <TouchableOpacity onPress={takePhoto} style={{ width: 60, height: 60, borderRadius: 50, borderColor: "white", borderWidth: 5, position: 'absolute', bottom: 50, left: "42%" }} ></TouchableOpacity>
                </Camera>

            </Modal>

            {/* <View style={{ padding: '4%' }}>
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
            </View> */}

            <View style={{ padding: '4%' }}>
                <Text style={styles.title}>Сделать фото сетки</Text>
                <Text style={styles.subTitle}>сфотографируйте сетку</Text>
                {img ? renderImg() : renderTakePhoto()}
            </View>

            {img != null && <View style={{ padding: '4%' }}>
                <TouchableOpacity onPress={changeGrid} activeOpacity={0.95} style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome5 name="trash-restore-alt" size={24} color="white" />
                    <Text style={[styles.text400_16, { marginLeft: '4%' }]}>Отчистить</Text>
                </TouchableOpacity>
            </View>}
        </View>
    )
}

export default CurrentGrid