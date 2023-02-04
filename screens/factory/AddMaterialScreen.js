import React, { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { Ionicons, EvilIcons, AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const AddMaterialScreen = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const [selectedLanguage, setSelectedLanguage] = useState();

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
                    <TouchableOpacity activeOpacity={0.9}
                        style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                        <Ionicons name="checkmark-sharp" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView style={{ marginTop: '4%' }}>

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Дата и время</Text>
                    <Text style={styles.subTitle}>выставляются автоматически</Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>21:18 19.01.2023г.</Text>
                    </View>
                </View>

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Сделать фото готового сырья</Text>
                    <Text style={styles.subTitle}>сфотографируйте получившиеся сырье</Text>

                    <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: 'row', padding: '4%', backgroundColor: '#f2f2f3', borderRadius: '20', alignItems: 'center', marginTop: '4%' }}>
                        <EvilIcons name="image" size={32} color="black" />
                        <View style={{ marginLeft: '4%' }}>
                            <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>Сделать фото</Text>
                            <Text style={styles.subTitle}>Макс. размер фото 10mb</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: '4%' }}>

                    <Text style={styles.title}>Категория</Text>
                    <Text style={styles.subTitle}>выберите категорию сырья</Text>

                    <Picker
                        itemStyle={styles.title}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Стекло" value="Стекло" />
                        <Picker.Item label="Картон" value="Картон" />
                    </Picker>
                </View>

                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default AddMaterialScreen
