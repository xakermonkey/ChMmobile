import React, { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native'
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';

// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const SalesScreen = ({ navigation }) => {

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
                        <Text style={[{ width: '80%', textAlign: 'center' }, styles.title, colorScheme.themeTextStyle2,]}>Сделки</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('sell_screen') }} activeOpacity={0.9}
                            style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                            <Ionicons name="cart" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>


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

            <ScrollView>
                    <View style={{width:'100%', padding:'4%'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.subTitle}>дата</Text>
                                <Text style={styles.text400_16}>16.01.23</Text>
                            </View>
                            <View style={{ width: 100 }}>
                                <Text style={styles.subTitle}>время</Text>
                                <Text style={styles.text400_16}>20:37</Text>
                            </View>
                        </View>
                        <Line />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.subTitle}>масса, кг</Text>
                                <Text style={styles.text400_16}>80</Text>
                            </View>
                            <View style={{ width: 100 }}>
                                <Text style={styles.subTitle}>цена за кг, руб</Text>
                                <Text style={styles.text400_16}>20</Text>
                            </View>
                        </View>
                        <Line />

                        <Text style={styles.subTitle}>стоимость, руб</Text>
                        <Text style={styles.text400_16}>1600</Text>
                </View>

                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default SalesScreen