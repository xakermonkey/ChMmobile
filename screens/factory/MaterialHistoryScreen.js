import React, { useEffect, useState, useRef, useCallback } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Appearance, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions, FlatList } from 'react-native'
import { Entypo, EvilIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain, domain_domain } from '../../domain';

const MaterialHistoryScreen = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const [materials, setMaterials] = useState([]);
    const [recycling, setRecycling] = useState([]);
    const [selectMaterial, setSelectMaterial] = useState(0);

    

    useFocusEffect(useCallback(() => {
        (async () => {
            try{
                const token = await AsyncStorage.getItem("token");
            const res = await axios.get(domain + "/main_factory", {headers: {"Authorization": "Token " + token}});
            setMaterials(res.data.materials);
            setRecycling(res.data.recycling);
            }
            catch(err){
                console.log(err);
            }
            
        })();
    }, []))


    const EmptyComponent = () => {
        return (<View><Text style={{ color: "white" }}>ПУСТО</Text></View>)
    }

    const renderItem = ({item}) => {
        return (<View style={{ padding: '4%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: domain_domain + item.photo }} style={{
                width: 120, height: 120, borderRadius: 20,
            }} />
            <View style={{ marginLeft: '2%', width: '60%' }}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.subTitle}>дата</Text>
                        <Text style={styles.text400_16}>{item.date.split(" ")[0]}</Text>
                    </View>
                    <View>
                        <Text style={styles.subTitle}>время</Text>
                        <Text style={styles.text400_16}>{item.date.split(" ")[1]}</Text>
                    </View>
                </View>
                <Text style={styles.subTitle}>масса</Text>
                <Text style={styles.text400_16}>{item.mass} кг</Text>
                <Line />
            </View>
        </View>
    </View>)
    }

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

            <View style={{ marginTop: '4%' }}>

                <View style={{ padding: '4%' }}>

                    <Text style={styles.title}>Категория</Text>
                    <Text style={styles.subTitle}>выберите категорию сырья</Text>

                    <Picker
                        itemStyle={styles.title}
                        selectedValue={selectMaterial}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectMaterial(itemValue)
                        }>
                        <Picker.Item label="Все" value={0} />
                        {materials.map(obj =>  <Picker.Item label={obj.type} value={obj.id} key={obj.id} />)}

                    </Picker>
                </View>

                <Line />
                
                <FlatList 
                data={selectMaterial == 0 ? recycling : recycling.filter(item => item.type == selectMaterial)}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<EmptyComponent />}
                />
                

                {/* <TouchableOpacity activeOpacity={0.9} style={{ padding: '4%' }}>
                    <Text style={{ color: '#0000004F', fontSize: 12 }}>Выход</Text>
                </TouchableOpacity> */}
                <View style={{ height: 100 }}></View>
            </View>
        </View>
    )
}

export default MaterialHistoryScreen
