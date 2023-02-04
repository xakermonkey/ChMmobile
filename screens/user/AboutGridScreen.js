import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, RefreshControl, Image, Text, ScrollView, ImageBackground, View } from 'react-native'
import { Feather, Entypo, AntDesign } from '@expo/vector-icons';
import MaskInput, { formatWithMask } from 'react-native-mask-input';
// import SkeletonContent from 'react-native-skeleton-content';
import { SearchBar } from '@rneui/base';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';

// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const AboutGridScreen = ({ navigation }) => {
    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    // return (
    //     <SkeletonContent
    //         containerStyle={{ flex: 1, width: 300 }}
    //         isLoading={true}
    //         layout={[
    //             { key: 'someId', width: 220, height: 20, marginBottom: 6 },
    //             { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
    //         ]}
    //     >
    //         <Text style={styles.normalText}>Your content</Text>
    //         <Text style={styles.bigText}>Other content</Text>
    //     </SkeletonContent>
    // )

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]} >
            <GeometryBackground/>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <ImageBackground source={{ uri: 'https://sun9-72.userapi.com/impg/jONgQIgnFe8KxYh04Ta7l6-mOEsypFkEeGuEkQ/4KdTQ_wyFcw.jpg?size=586x604&quality=95&sign=eb3de4bce88e48db55f4d07650fc45f5&type=album' }}
                imageStyle={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }} style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', height: '100%', padding: '3%', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('main_navigator') }} activeOpacity={0.9}
                        style={{ backgroundColor: '#549D41', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={{ flex: 1, padding: '3%' }}>
                <Text style={[styles.title, {textAlign:'center', marginBottom:'5%'}]}>Эта сетка предназначена для пластика</Text>


                <Text style={styles.title}>Что можно бросать?</Text>
                <Text style={styles.subTitle}>какой мусор можно бросать в данную сетку</Text>
                <View style={{ padding: '4%' }}>
                    <Text style={styles.text400_16}>- Пластиковые бутылки</Text>
                    <Text style={styles.text400_16}>- Пищевой пластик</Text>
                    <Text style={styles.text400_16}>- Фантики</Text>
                </View>
                <View style={{alignItems:'center'}}>
                <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#549D41', padding: '3%', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name="alert-circle" size={24} color="white" />
                    <Text style={[styles.text400_16, { color: 'white', marginLeft:'2%' }]}>Сообщить нам о заполнении</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AboutGridScreen
