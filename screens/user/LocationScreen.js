import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, RefreshControl, Image, Text, ScrollView, ImageBackground, View } from 'react-native'
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
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

const LocationScreen = ({ navigation }) => {
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
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <GeometryBackground/>
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <View style={[styles.rowBetweenCenter, { padding: '3%' }]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('main_navigator') }} activeOpacity={0.9}
                        style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width:40, height:40 }}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={[{ width:'80%', textAlign: 'center' }, styles.title, colorScheme.themeTextStyle2,]}>Где вы находитесь?</Text>
                    <View style={{ flex: 1 }}></View>
                </View>
            </LinearGradient>

            <SearchBar
                placeholder="Найти СНТ"
                // onChangeText={setSearch}
                // // value={search}
                containerStyle={{ backgroundColor: null }}
                // inputContainerStyle={themeContainerSelectStyle}
                platform='ios'
                cancelButtonTitle='Отмена'
                style={{ color: colorScheme === 'light' ? '#0C0C0D' : '#F2F2F3', }}
            />
            <ScrollView style={{ height: '100%' }}>
                <RefreshControl
                // refreshing={refreshing}
                // onRefresh={onRefresh}
                />
                <View style={{ padding: '4%' }}>
                    {/* {airport.filter(filterAirport).map((obj) => { */}
                    {/* return ( */}
                    {/* <TouchableOpacity key={obj.iata} activeOpacity={0.5} onPress={() => customSelectAirport(obj)}> */}
                    <TouchableOpacity activeOpacity={0.5}>
                        <View style={{
                            height: 100, marginBottom: "5%", shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 1,
                        }}>
                            <ImageBackground source={{ uri: 'https://avatars.dzeninfra.ru/get-zen_doc/2816669/pub_616c31d50669723cc4518637_616c3340b61f6a1a55bb6d81/scale_1200' }} style={{ flex: 1 }} imageStyle={{ borderRadius: 16, }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row', flex: 1, borderRadius: 16 }}>
                                    <View style={{ justifyContent: 'flex-end', flex: 1, bottom: 12, left: 12 }}>
                                        <Text style={[styles.title, { color: '#F2F2F3' }]}>СНТ</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start', flex: 1, top: 12, right: 12 }}>
                                        <RadioButtonInput
                                            // obj={obj}
                                            // index={0}
                                            // isSelected={selectAirport === obj}
                                            // onPress={() => customSelectAirport(obj)}
                                            buttonInnerColor='#F5CB57'
                                            buttonOuterColor={colorScheme === 'light' ? '#23232A07' : '#F2F2F31F'}
                                            buttonSize={24}
                                            buttonOuterSize={31}
                                            buttonStyle={{ backgroundColor: colorScheme === 'light' ? '#e8e8e9' : '#F2F2F31F' }}

                                        /></View>
                                </View>
                            </ImageBackground>

                        </View>
                    </TouchableOpacity>
                    {/* ) */}
                    {/* })} */}
                </View>
            </ScrollView>
        </View>
    )
}

export default LocationScreen
