import React, { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { Entypo, EvilIcons, AntDesign } from '@expo/vector-icons';
import styleScheme from '../style/colorSchemes'
import { Picker } from '@react-native-picker/picker';


// import axios from 'axios';
// import { domain } from '../domain';
// import { Ionicons } from '@expo/vector-icons';

const AddMaterialScreen = ({ navigation }) => {

    const colorScheme = styleScheme();

    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{
                backgroundColor: '#ffdecf', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '4%' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { navigation.navigate('factory_navigator'); }}
                    >
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Inter_600SemiBold', color: "white" }}>Подтвердить</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <ScrollView style={{ marginTop: '4%' }}>
                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, textAlign: 'center' }}>Добавление записи о переработке</Text>

                <View style={{ padding: '4%' }}>
                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Дата и время</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>выставляются автоматически</Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <Text style={{ fontFamily: 'Inter_500Medium' }}>21:18 19.01.2023г.</Text>
                    </View>
                </View>

                <View style={{ padding: '4%' }}>
                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Сделать фото готового сырья</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>сфотографируйте получившиеся сырье</Text>

                    <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: 'row', padding: '4%', backgroundColor: '#f2f2f3', borderRadius: '20', alignItems: 'center', marginTop: '4%' }}>
                        <EvilIcons name="image" size={32} color="black" />
                        <View style={{ marginLeft: '4%' }}>
                            <Text style={{ fontFamily: 'Inter_500Medium' }}>Сделать фото</Text>
                            <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>Макс. размер фото 10mb</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: '4%' }}>

                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Категория</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>выберите категорию сырья</Text>

                    <Picker
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        marginTop: 24,
        fontSize: 24,
        fontFamily: "Inter_800ExtraBold",
    },
    subtext: {
        marginTop: 8,
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 24,
    },
    subsubtext: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        lineHeight: 24,
    },
    inputText: {
        // flex:1,
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        // marginTop: '25%'
    },
    keyboard: {

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 24,
        // paddingHorizontal:'15%'
        width: 300
    },
    btn: {
        width: 72,
        height: 72,
        borderRadius: 72,
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft:24
    },
    num: {
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold",
    },



    lightContainer: {
        color: "#0C0C0D7A",
    },
    darkContainer: {
        backgroundColor: '#17171C',
    },
    lightText: {
        color: "#0C0C0D",
    },
    darkText: {
        color: '#F2F2F3',
    },
    lightSubText: {
        color: "#0C0C0D7A",
    },
    darkSubText: {
        color: '#F2F2F37A',
    },
    lightContainerSelect: {
        backgroundColor: "#F5CB57"
    },
    darkContainerSelect: {
        backgroundColor: "#F2F2F31F"
    },



})
