import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native'
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import styleScheme from '../style/colorSchemes';
import { Picker } from '@react-native-picker/picker';


const SellScreen = ({ navigation }) => {

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
                        onPress={() => { navigation.navigate('factory_navigator'); }}>
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#5e6f64', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Inter_600SemiBold', color: "white" }}>Подтвердить</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ marginTop: '4%', backgroundColor: '#fff' }}>
                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, textAlign: 'center' }}>Добавление сделки</Text>

                <View style={{ padding: '4%' }}>
                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Дата и время</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>дата и время сделки</Text>

                    <View style={{ marginTop: '4%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput style={{ fontFamily: 'Inter_500Medium', backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, width: '49%' }}>21.01.2023</TextInput>
                        <TextInput style={{ fontFamily: 'Inter_500Medium', backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, width: '49%' }}>17:00</TextInput>
                    </View>
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

                <View style={{ padding: '4%' }}>
                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Масса</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>общая масса сделки, кг</Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <TextInput style={{ fontFamily: 'Inter_500Medium' }}>160</TextInput>
                    </View>
                </View>

                <View style={{ padding: '4%' }}>
                    <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}>Цена за килограмм</Text>
                    <Text style={{ fontFamily: 'Inter_400Regular', color: '#0000004F', fontSize: 12 }}>цена за один килограмм сырья, руб.</Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <TextInput style={{ fontFamily: 'Inter_500Medium' }}>50</TextInput>
                    </View>
                </View>

                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default SellScreen

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
        fontSize: 32,
        fontFamily: "Inter_800ExtraBold",
        // marginTop: '25%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 24,
        width: 300
    },
    btn: {
        width: 72,
        height: 72,
        borderRadius: 72,
        alignItems: 'center',
        justifyContent: 'center'
    },
    num: {
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold",
    },
})