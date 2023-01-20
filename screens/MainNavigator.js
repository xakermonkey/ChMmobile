import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import MainScreen from './MainScreen'
import OrderScreen from './OrderScreen'
import MakingOrderScreen from './MakingOrderScreen'

const Tab = createBottomTabNavigator();

const CustomButton = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()} activeOpacity={1} style={{ bottom: 35, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6, }}>
            <LinearGradient
                colors={['#ffdecf', '#ba7967']}
                style={{ alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 50 }}>
                <FontAwesome name="map-o" size={24} color="white" />
            </LinearGradient>
        </TouchableOpacity>
    )
}

const MainScreenButton = {
    headerShown: false,
    tabBarIcon: () => <AntDesign name="home" size={24} color="white" />,
    tabBarLabel: 'Главная',
    tabBarActiveTintColor: 'white'
}
const MakingOrderScreenButton = {
    headerShown: false,
    tabBarButton: (props) => <CustomButton {...props} />
}
const OrderScreenButton = {
    headerShown: false,
    tabBarIcon: () => <FontAwesome name="reorder" size={24} color="white" />,
    tabBarLabel: 'Заказы',
    tabBarActiveTintColor: 'white'
}


const MainNavigator = ({ navigation }) => {

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen options={MainScreenButton} name="main_screen" component={MainScreen} />
            <Tab.Screen options={MakingOrderScreenButton} name="making_order_screen" component={MakingOrderScreen} />
            <Tab.Screen options={OrderScreenButton} name="order_screen" component={OrderScreen} />
        </Tab.Navigator>
    )
}

const screenOptions = {
    tabBarStyle: {
        backgroundColor: '#5e6f64',
        // width:'96%',
        // left:'2%',
        // borderRadius:20,
        // bottom:20
    },
}

export default MainNavigator