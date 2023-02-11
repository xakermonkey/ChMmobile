import React, { useCallback, useState, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Image, Text, TouchableOpacity, View, ScrollView, Modal, FlatList } from 'react-native'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain, domain_domain } from '../../domain';
import GridItem from '../../components/GridItem';
import CurrentGrid from '../../components/CurrentGrid';

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

    const [loading, setLoading] = useState(true);
    const [entry, setEntry] = useState([]);
    const [acceptEntry, setAcceptEntry] = useState(null);
    const [uri, setUri] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const updateGrid = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(domain + "/change_grid", { headers: { "Authorization": "Token " + token } });
            setEntry(res.data.entry);
            setAcceptEntry(res.data.accept_entry);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError(true);
        }
    }

    useFocusEffect(useCallback(() => {
        (async () => {
            await updateGrid();
        })();
    }, []))



    const EmptyComponent = () => {
        return (<View style={{alignItems:'center', marginTop:'30%'}}>
        <Text style={styles.title}>Задач по сеткам нет</Text>
        </View>)
    }

    const openImg = (uri) => {
        setUri(uri);
        setModalVisible(true);
    }

    const delEntry = (id) => {
        console.log("Delete", id);
        setEntry(entry.filter(item => item.id != id))
    }



    const onRefresh = async () => {
        setRefreshing(true);
        await updateGrid();
        setRefreshing(false);
    }

    const renderList = () => {
        return (
            <View style={{height:'100%'}}>
                <View style={{ padding: '4%' }} >
                    {/* <Text style={styles.title}>Замечания клиентов</Text> */}
                    <Text style={[styles.subTitle, {textAlign:'center'}]}>здесь также отбражаются замечания от клиентов, которые считают, что сетка заполнена</Text>
                </View>
                <FlatList
                    data={entry}
                    keyExtractor={item => item.id}
                    renderItem={({ ind, item }) => <GridItem item={item} colorScheme={colorScheme} openImg={openImg} delEntry={delEntry} setAcceptEntry={setAcceptEntry} />}
                    ListEmptyComponent={<EmptyComponent />}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    // ListFooterComponent={<View style={{ height: 100 }}></View>}
                />
            </View>
        )
    }

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]}>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <GeometryBackground />
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <SafeAreaView >
                    <View style={[styles.rowBetweenCenter, { padding: '3%' }]}>
                        <View style={{flex:1}}></View>
                        <Text style={[{ width: '80%', textAlign: 'center' }, styles.title, colorScheme.themeTextStyle2,]}>Задачи по сеткам</Text>
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
                animationOut="slide"
                swipeDirection="down"
            >
                <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ width: 60, height: 60 }} ><Text style={{ color: 'black' }}>X</Text></TouchableOpacity>
                    <Image source={{ uri: domain_domain + uri }} style={{ height: '90%', width: '90%', borderRadius: 5 }} resizeMode='contain' />
                </SafeAreaView>

            </Modal>
            {acceptEntry == null ? renderList() : <CurrentGrid item={acceptEntry} colorScheme={colorScheme} setLoading={setLoading} setAcceptEntry={setAcceptEntry} />}

            {/* <Line />  */}

            {/* <TouchableOpacity activeOpacity={0.9} style={{ padding: '4%' }}>
                    <Text style={styles.subTitle}>Выход</Text>
                </TouchableOpacity> */}





            {/* </ScrollView> */}
        </View>
    )
}

export default CourierDriver

