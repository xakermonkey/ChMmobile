import React, { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons, FontAwesome, AntDesign, MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MakingOrderScreen = ({ navigation }) => {

    const colorScheme = styleScheme()
    const styles = colorScheme.styles;

    const [region, setRegion] = useState({
        latitude: 59.938951,
        longitude: 30.315635,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0221
    });
    const [location, setLocation] = useState(null);
    const MapRef = useRef(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);


    const getLoc = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("ALARM", 'Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);

    }


    const nextStep = async () => {
        await AsyncStorage.setItem("orderRegion", JSON.stringify(region));
        await AsyncStorage.setItem("orderAddress", address);
        navigation.navigate('create_photo_screen');
    }

    useEffect(() => {
        getLoc();
        getAddress({
            latitude: 59.938951,
            longitude: 30.315635,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0221
        });
    }, [])

    const getAddress = async (region) => {
        setLoading(true);
        try {
            const address = await MapRef.current?.addressForCoordinate({ latitude: region.latitude, longitude: region.longitude });
            setAddress(address.name);
            setRegion(region);

        }
        catch (err) {

        }
        setLoading(false);
    }


    const onRegionChangeComplete = (region, isGesture) => {
        getAddress(region);
    }

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]} >
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <MapView style={{
                width: '100%',
                height: '100%',
            }}
                initialRegion={{
                    latitude: 59.938951,
                    longitude: 30.315635,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0221
                }}
                ref={MapRef}
                showsUserLocation={true}
                onRegionChangeComplete={onRegionChangeComplete}
                userLocationPriority="balanced"
            />

            <View style={{ left: Dimensions.get('window').width / 2 - 21, top: Dimensions.get('window').height / 2 - 21, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <Entypo name="location-pin" size={42} color="red" style={{ width: 42, height: 42 }} />
            </View>

            <View style={{ bottom: 0, right: 0, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={nextStep} activeOpacity={0.9}
                    style={{ backgroundColor: '#549D41', width: 40, height: 40, padding: '10%', borderRadius: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <SafeAreaView style={{ position: 'absolute', width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: '2%' }}>
                    <View style={{ height: 3, backgroundColor: '#549D41', marginRight: '3%', width: 50 }} />
                    <View style={{ height: 3, backgroundColor: '#fff', marginRight: '3%', width: 50 }} />
                    <View style={{ height: 3, backgroundColor: '#fff', marginRight: '3%', width: 50 }} />
                </View>
                <View style={[{ padding: '4%', alignItems: 'center' }]}>
                    <Text style={styles.subTitle}>Ваш адрес</Text>
                    {loading ? <ActivityIndicator color="white" /> : <Text style={styles.title}>{address}</Text>}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default MakingOrderScreen