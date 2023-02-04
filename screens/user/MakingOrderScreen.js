import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons, FontAwesome, AntDesign, MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
import MapView from 'react-native-maps';
// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';

const MakingOrderScreen = ({ navigation }) => {

    const colorScheme = styleScheme()
    const styles = colorScheme.styles;
    
    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]} >
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <MapView style={{
                width: '100%',
                height: '100%',
            }}
                initialRegion={{
                    latitude: 59.5619,
                    longitude: 30.1850,
                }}
                minZoomLevel={8} />

            <View style={{ left: Dimensions.get('window').width / 2 - 21, top: Dimensions.get('window').height / 2 - 21, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <Entypo name="location-pin" size={42} color="red" style={{ width: 42, height: 42 }} />
            </View>

            <View style={{ bottom: 0, right: 0, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('create_photo_screen')} activeOpacity={0.9}
                    style={{ backgroundColor: '#549D41', width:40, height:40, padding:'10%', borderRadius: '50%', justifyContent: 'center', alignItems: 'center' }}>
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
                    <Text style={styles.title}>Королева 57</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default MakingOrderScreen