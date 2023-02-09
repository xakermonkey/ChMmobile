import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native'
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import styleScheme from '../../style/colorSchemes'
import { colors } from '../../style/colors';
import GeometryBackground from '../../components/GeometryBackground';
import Line from '../../components/Line';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { domain } from '../../domain';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';



const SellScreen = ({ navigation }) => {

    const colorScheme = styleScheme();
    const styles = colorScheme.styles;

    const [materials, setMaterials] = useState([]);
    const [mass, setMass] = useState("0");
    const [pricePerKg, setPricePerKg] = useState("0");
    const [total, setTotal] = useState();
    const [selectedMaterial, setSelectedMaterial] = useState();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };


    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const BottomDateView = (datetype) => {
        BottomDate.current.snapToIndex(0);
        if (datetype == 'date') {
            showDatepicker()
        } else { showTimepicker() }
    }

    const BottomDate = useRef(null)

    const snapPoints = useMemo(() => ['40%'], []);


    const ViewDate = () => {
        let now = '';
        const day = date.getDate().toString();
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();
        now = "0".repeat(2-day.length) + day + '.' + "0".repeat(2-month.length) + month + '.' + year
        // console.log(date.getTime());
        return now;
    }
    const ViewDateTime = () => {
        let now = '';
        const hours = date.getHours().toString();
        const minute = date.getMinutes().toString();
        now = "0".repeat(2-hours.length) + hours + ':' + "0".repeat(2-minute.length) + minute;
        // console.log(date.getTime());
        return now;
    }

    const CustomBackDrop = (props) => {
        return (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                opacity='0.9'
                closeOnPress={false}
                enableTouchThrough={false}
                pressBehavior='none'
            />
        );
    };

    const changeMass = (mass) => {
        if (mass == "") {
            mass = 0;
        }
        setMass(mass);
        setTotal(mass * parseFloat(pricePerKg));
    }

    const changePrice = (price) => {
        if (price == "") {
            price = 0;
        }
        setPricePerKg(price)
        setTotal(price * parseFloat(mass));
    }

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const res = await axios.get(domain + "/add_sale_recycling", { headers: { "Authorization": "Token " + token } });
                setMaterials(res.data.materials);
            }
            catch (err) {
                console.log(err);
            }

        })();
    }, []))


    const createSaleRecycling = async () => {
        try{
            const token = await AsyncStorage.getItem("token");
            const res = await axios.post(domain + "/add_sale_recycling", {
                "date": date.toLocaleString(),
                "type": selectedMaterial,
                "mass": mass,
                "price": pricePerKg
            }, {
                headers: {"Authorization": "Token "+ token}
            })
            navigation.goBack();
        }catch(err) {
            console.log(err);
        }
        

    }

    return (
        <View style={[colorScheme.themeContainerStyle, { flex: 1 }]}>
            <StatusBar style={colorScheme.colorScheme === 'dark' ? 'light' : 'dark'} />
            <GeometryBackground />
            <LinearGradient
                colors={colorScheme.gradientHeader} >
                <View style={[styles.rowBetweenCenter, { padding: '3%' }]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('sales_screen') }} activeOpacity={0.9}
                        style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={[{ textAlign: 'center' }, styles.title, colorScheme.themeTextStyle2,]}>Добавление сделки</Text>
                    {mass != "" && mass != "0" && pricePerKg != "" && pricePerKg != "0" ?<TouchableOpacity onPress={createSaleRecycling} activeOpacity={0.9}
                        style={{ backgroundColor: 'white', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}>
                        <Ionicons name="checkmark-sharp" size={24} color="black" />
                    </TouchableOpacity> : <View></View>}
                </View>
            </LinearGradient>

            <ScrollView style={{ marginTop: '4%' }}>

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Дата и время</Text>
                    <Text style={styles.subTitle}>дата и время сделки</Text>

                    <View style={{ marginTop: '4%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => BottomDateView('date')} style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, width: '49%' }}><Text>{ViewDate()}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => BottomDateView('time')} style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, width: '49%' }}><Text>{ViewDateTime()}</Text></TouchableOpacity>
                    </View>
                </View>

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Категория</Text>
                    <Text style={styles.subTitle}>выберите категорию сырья</Text>
                    <Picker
                        itemStyle={styles.title}
                        selectedValue={selectedMaterial}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedMaterial(itemValue)
                        }>
                        {materials.map(obj => <Picker.Item label={obj.type} value={obj.id} key={obj.id} />)}
                    </Picker>
                </View>

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Масса</Text>
                    <Text style={styles.subTitle}>общая масса сделки, кг</Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <TextInput value={mass} onChangeText={changeMass} keyboardType='decimal-pad' style={[styles.text400_16, colorScheme.themeTextStyle2]} />
                    </View>
                </View>

                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Цена за килограмм</Text>
                    <Text style={styles.subTitle}>цена за один килограмм сырья, руб.</Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <TextInput value={pricePerKg} onChangeText={changePrice} keyboardType='decimal-pad' style={[styles.text400_16, colorScheme.themeTextStyle2]} />
                    </View>
                </View>


                <View style={{ padding: '4%' }}>
                    <Text style={styles.title}>Итоговая цена</Text>
                    <Text style={styles.subTitle}></Text>

                    <View style={{ backgroundColor: '#f2f2f3', padding: '4%', borderRadius: 20, marginTop: '4%' }}>
                        <Text style={[styles.text400_16, colorScheme.themeTextStyle2]}>{total}</Text>
                    </View>
                </View>

                <View style={{ height: 100 }}></View>
            </ScrollView>
            <BottomSheet
                ref={BottomDate}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={CustomBackDrop}
            >
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="spinner"
                        onChange={onChange}
                        locale="ru-RU"
                        textColor="black"
                    />
                )}
            </BottomSheet>

        </View>
    )
}

export default SellScreen