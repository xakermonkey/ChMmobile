import React, { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Appearance, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native'
import { Entypo, EvilIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const MaterialHistoryScreen = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]}>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <GeometryBackground />
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <SafeAreaView >
                    <View style={[styles.rowBetweenCenter, { padding: '3%' }]}>
                        <View style={{ flex: 1 }}></View>
                        <Text style={[{ width: '80%', textAlign: 'center' }, styles.title, colorScheme.themeTextStyle2,]}>История переработок</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('add_material_screen') }} activeOpacity={0.9}
                            style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                            <AntDesign name="plus" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView style={{ marginTop: '4%' }}>

                <View style={{ padding: '4%' }}>

                    <Text style={styles.title}>Категория</Text>
                    <Text style={styles.subTitle}>выберите категорию сырья</Text>

                    <Picker
                        itemStyle={styles.title}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Все" value="Все" />
                        <Picker.Item label="Стекло" value="Стекло" />
                        <Picker.Item label="Картон" value="Картон" />
                    </Picker>
                </View>

                <Line />

                <View style={{ padding: '4%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: 'https://kartinkin.net/uploads/posts/2022-03/1646175252_15-kartinkin-net-p-kartinki-musora-16.jpg' }} style={{
                            width: 120, height: 120, borderRadius: 20,
                        }} />
                        <View style={{ marginLeft: '2%', width: '60%' }}>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.subTitle}>дата</Text>
                                    <Text style={styles.text400_16}>16.01.23</Text>
                                </View>
                                <View>
                                    <Text style={styles.subTitle}>время</Text>
                                    <Text style={styles.text400_16}>20:37</Text>
                                </View>
                            </View>
                            <Text style={styles.subTitle}>масса</Text>
                            <Text style={styles.text400_16}>80 кг</Text>
                            <Line />
                        </View>
                    </View>
                </View>

                {/* <TouchableOpacity activeOpacity={0.9} style={{ padding: '4%' }}>
                    <Text style={{ color: '#0000004F', fontSize: 12 }}>Выход</Text>
                </TouchableOpacity> */}
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default MaterialHistoryScreen
