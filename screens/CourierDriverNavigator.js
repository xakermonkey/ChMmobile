import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import IncomingOrders from './IncomingOrdersScreen'
import HistoryIncomingOrders from './HistoryIncomingOrdersScreen'
import CourierDriver from './CourierDriverScreen'


const Tab = createBottomTabNavigator();

const IncomingOrdersButton = {
    headerShown: false,
    tabBarIcon: () => <FontAwesome5 name="wine-bottle" size={24} color="white" />,
    tabBarLabel: 'Заказы',
    tabBarActiveTintColor: 'white'
}
const HistoryIncomingOrdersButton = {
    headerShown: false,
    tabBarIcon: () => <FontAwesome5 name="history" size={24} color="white" />,
    tabBarLabel: 'История',
    tabBarActiveTintColor: 'white'
}
const CourierDriverButton = {
    headerShown: false,
    tabBarIcon: () => <Feather name="box" size={24} color="white" />,
    tabBarLabel: 'Сетки',
    tabBarActiveTintColor: 'white'
}


const CourierDriverNavigator = ({ navigation }) => {

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen options={IncomingOrdersButton} name="incoming_orders" component={IncomingOrders} />
            <Tab.Screen options={HistoryIncomingOrdersButton} name="history_incoming_orders" component={HistoryIncomingOrders} />
            <Tab.Screen options={CourierDriverButton} name="courier_driver" component={CourierDriver} />
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

export default CourierDriverNavigator