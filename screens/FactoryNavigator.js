import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import MaterialHistoryScreen from './MaterialHistoryScreen'
import SalesScreen from './SalesScreen'

const Tab = createBottomTabNavigator();

const MaterialHistoryScreenButton = {
    headerShown: false,
    tabBarIcon: () => <FontAwesome5 name="wine-bottle" size={24} color="white" />,
    tabBarLabel: 'Переработка сырья',
    tabBarActiveTintColor: 'white'
}
const SalesScreenButton = {
    headerShown: false,
    tabBarIcon: () => <MaterialIcons name="point-of-sale" size={24} color="white" />,
    tabBarLabel: 'Сделки',
    tabBarActiveTintColor: 'white'
}


const FactoryNavigator = ({ navigation }) => {

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen options={MaterialHistoryScreenButton} name="history_screen" component={MaterialHistoryScreen} />
            <Tab.Screen options={SalesScreenButton} name="sales_screen" component={SalesScreen} />
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

export default FactoryNavigator