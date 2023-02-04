import React, { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import { Feather, EvilIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';

// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const CreatePhotoScreen = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const [selectedLanguage, setSelectedLanguage] = useState();

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
                        <TouchableOpacity onPress={() => { navigation.navigate('order_completion_screen') }} activeOpacity={0.9} style={{ width: 40, height: 40, backgroundColor: '#FFFFFF', padding: '2%', borderRadius: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="checkmark-sharp" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>


            <ScrollView style={{ marginTop: '4%' }}>

                <View style={{ padding: '4%', alignItems: 'center' }}>
                    <Text style={styles.title}>Сделайте фото мусора</Text>
                    <Text style={[styles.subTitle, { textAlign: 'center' }]}>сфотографируйте мусор, который необходимо вывезти</Text>

                    <Image source={require('../../assets/items/trash_dump.png')} style={{ height: '120%', width: '100%' }} resizeMode='contain' />

                    <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: 'row', padding: '4%', backgroundColor: '#f2f2f3', borderRadius: '20', alignItems: 'center', marginTop: '4%' }}>
                        <EvilIcons name="image" size={32} color="black" />
                        <View style={{ marginLeft: '4%' }}>
                            <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>Сделать фото</Text>
                            <Text style={styles.subTitle}>Макс. размер фото 10mb</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default CreatePhotoScreen
