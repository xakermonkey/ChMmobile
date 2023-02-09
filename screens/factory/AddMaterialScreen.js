import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Modal } from 'react-native'
import { Ionicons, EvilIcons, AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CameraType } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
import axios from 'axios';
import { domain } from '../../domain';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';

const AddMaterialScreen = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;
    const [mass, setMass] = useState(0);
    const [materials, setMaterials] = useState([]);
    const cameraRef = useRef();
    const [modalVisible, setModalVisible] = useState(false);
    const [img, setImg] = useState(null);
    const [selectedMaterial, setSelectedmaterial] = useState(0);

    useLayoutEffect(() => {
        (async () => {
            await Camera.requestCameraPermissionsAsync();
        })();
    }, [])

    useFocusEffect(useCallback(() => {
        (async () => {
            try{
                const token = await AsyncStorage.getItem("token");
            const res = await axios.get(domain + "/add_recycling", {headers: {"Authorization": "Token " + token}});
            setMaterials(res.data.materials);
            }
            catch(err){
                console.log(err);
            }
            
        })();
    }, []))

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

    const completeCreated = async () => {
        try {
            // setLoading(true);
            const token = await AsyncStorage.getItem("token");
            const data = new FormData();
            data.append("mass", parseFloat(mass));
            data.append("type", selectedMaterial);
            data.append('file', img);
            try {
                const res = await fetch(domain + "/add_recycling", {
                    method: "POST",
                    body: data,
                    headers: {
                        "Authorization": "Token " + token,
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    }
                });
                const ret = await res.json();
                navigation.goBack();
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
            <GeometryBackground />
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <View style={[styles.rowBetweenCenter, { padding: '3%' }]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('history_screen') }} activeOpacity={0.9}
                        style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={[{ textAlign: 'center' }, styles.title, colorScheme.themeTextStyle2,]}>Добавление записи</Text>
                        <Text style={[{ textAlign: 'center' }, styles.title, colorScheme.themeTextStyle2,]}>о переработке</Text>
                    </View>
                    {img != null && mass != "" ? <TouchableOpacity activeOpacity={0.9} onPress={completeCreated}
                        style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                        <Ionicons name="checkmark-sharp" size={24} color="black" />
                    </TouchableOpacity> : <View></View>}
                    
                </View>
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

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Дата и время</Text>
                    <Text style={styles.subTitle}>выставляются автоматически</Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>21:18 19.01.2023г.</Text>
                    </View>
                </View>

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Вес  </Text>
                    <Text style={styles.subTitle}>перерабатываемого метериала</Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <TextInput value={mass} onChangeText={setMass} keyboardType='decimal-pad' style={[styles.text400_16, colorScheme.themeTextStyle2]} />
                    </View>
                </View>

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Сделать фото готового сырья</Text>
                    <Text style={styles.subTitle}>сфотографируйте получившиеся сырье</Text>
                    {img == null ? <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.6} style={{ flexDirection: 'row', padding: '4%', backgroundColor: '#f2f2f3', borderRadius: '20', alignItems: 'center', marginTop: '4%' }}>
                        <EvilIcons name="image" size={32} color="black" />
                        <View style={{ marginLeft: '4%' }}>
                            <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>Сделать фото</Text>
                            <Text style={styles.subTitle}>Макс. размер фото 10mb</Text>
                        </View>
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setImg(null) }} style={{ height: 50, width: 50, marginTop: 10 }}>
                            <Image source={{ uri: img.uri }} style={{ height: 50, width: 50 }} resizeMode='contain' />
                        </TouchableOpacity>
                    }
                </View>

                <View style={{ padding: '4%' }}>

                    <Text style={styles.title}>Категория</Text>
                    <Text style={styles.subTitle}>выберите категорию сырья</Text>

                    <Picker
                        itemStyle={styles.title}
                        selectedValue={selectedMaterial}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedmaterial(itemValue)
                        }>
                       {materials.map(obj =>  <Picker.Item label={obj.type} value={obj.id} key={obj.id} />)}
                    </Picker>
                </View>

                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default AddMaterialScreen
