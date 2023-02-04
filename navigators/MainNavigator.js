import React from 'react'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import MainScreen from '../screens/user/MainScreen'
import OrderScreen from '../screens/user/OrderScreen'
import MakingOrderScreen from '../screens/user/MakingOrderScreen'

const Tab = createBottomTabNavigator();

const CustomButton = (props) => {
    return (<View style={{ width: 70, height: 70 }}></View>
        // <TouchableOpacity onPress={() => props.onPress()} activeOpacity={0.95}
        // style={{
        //     bottom: 35, shadowColor: "#000",
        //     shadowOffset: {
        //         width: 0,
        //         height: 3,
        //     },
        //     shadowOpacity: 0.27,
        //     shadowRadius: 4.65,

        //     elevation: 6,
        // }}>
        //     <LinearGradient
        //         colors={['#ffdecf', '#ba7967']}
        //         style={{ alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 50 }}>
        //         <MaterialCommunityIcons name="truck-fast-outline" size={38} color="white" />
        //     </LinearGradient>
        // </TouchableOpacity>
    )
}


const MainScreenButton = {
    headerShown: false,
    tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
    tabBarLabel: 'Главная',
    tabBarActiveTintColor: 'white',
}
const MakingOrderScreenButton = {
    headerShown: false,
    tabBarButton: (props) => <CustomButton {...props} />
}
const OrderScreenButton = {
    headerShown: false,
    tabBarIcon: () => <FontAwesome name="reorder" size={24} color="black" />,
    tabBarLabel: 'Заказы',
    tabBarActiveTintColor: 'white'
}


const MainNavigator = ({ navigation }) => {

    return (
        <Tab.Navigator screenOptions={screenOptions} tabBar={(props) => {
            return (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('making_order_screen')} activeOpacity={0.95} style={{
                        position: 'absolute', bottom: 35, zIndex: 1, alignSelf: 'center', backgroundColor: '#FDF398',
                        alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 50
                    }}>
                        <MaterialCommunityIcons name="truck-fast-outline" size={38} color="black" />
                    </TouchableOpacity>
                    <LinearGradient
                        colors={['#75C860', '#C4FEB6']}>
                        <BottomTabBar
                            {...props}
                        />
                    </LinearGradient>
                </View>

            )
        }}>
            <Tab.Screen options={MainScreenButton} name="main_screen" component={MainScreen} />
            <Tab.Screen options={MakingOrderScreenButton} name="making_order_screen" component={MakingOrderScreen} />
            <Tab.Screen options={OrderScreenButton} name="order_screen" component={OrderScreen} />
        </Tab.Navigator>
    )
}

const screenOptions = {
    tabBarStyle: {
        backgroundColor: 'transparent',
        // width:'96%',
        // left:'2%',
        // borderRadius:20,
        // bottom:20
    },
}

export default MainNavigator