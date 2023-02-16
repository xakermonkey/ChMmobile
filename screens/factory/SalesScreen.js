import React, { useEffect, useState, useRef, useLayoutEffect, useCallback } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions, FlatList } from 'react-native'
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain } from '../../domain';

const SalesScreen = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const [selectedMaterial, setSelectedmaterial] = useState(0);
    const [materials, setMaterials] = useState([]);
    const [saleRecycling, setSaleRecycling] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const updateHistory = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(domain + "/sale_recycling", { headers: { "Authorization": "Token " + token } });
            setMaterials(res.data.materials);
            setSaleRecycling(res.data.sale_recycling);
            console.log(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(useCallback(() => {
        (async () => {
            await updateHistory();
        })();
    }, []))


    const EmptyComponent = () => {
        return (<View style={{ alignItems: 'center', marginTop: '30%' }}>
            <Text style={styles.title}>Сделок еще нет</Text>
        </View>)
    }


    const renderItem = ({ item }) => {
        return (<View style={{ width: '100%', padding: '4%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.subTitle}>дата</Text>
                    <Text style={styles.text400_16}>{item.date.split(" ")[0]}</Text>
                </View>
                <View style={{ width: 100 }}>
                    <Text style={styles.subTitle}>время</Text>
                    <Text style={styles.text400_16}>{item.date.split(" ")[1]}</Text>
                </View>
            </View>
            <Line />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.subTitle}>масса, кг</Text>
                    <Text style={styles.text400_16}>{item.mass}</Text>
                </View>
                <View style={{ width: 100 }}>
                    <Text style={styles.subTitle}>цена за кг, руб</Text>
                    <Text style={styles.text400_16}>{item.price_per_kg}</Text>
                </View>
            </View>
            <Line />

            <Text style={styles.subTitle}>стоимость, руб</Text>
            <Text style={styles.text400_16}>{item.total_price}</Text>
        </View>)
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await updateHistory();
        setRefreshing(false);
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
                    selectedValue={selectedMaterial}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedmaterial(itemValue)
                    }>
                    <Picker.Item label="Все" value={0} />
                    {materials.map(obj => <Picker.Item label={obj.type} value={obj.id} key={obj.id} />)}
                </Picker>
            </View>

            <Line />

            <FlatList
                data={selectedMaterial == 0 ? saleRecycling : saleRecycling.filter(item => item.type == selectedMaterial)}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<EmptyComponent />}
                refreshing={refreshing}
                onRefresh={onRefresh}
                // ListFooterComponent={<View style={{ height: 420 }} ></View>}
            />
        </View>
    )
}

export default SalesScreen