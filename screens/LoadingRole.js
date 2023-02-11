import { StyleSheet, Image, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import styleScheme from '../style/colorSchemes'

const LoadingRole = ({ navigation }) => {
    const colorScheme = styleScheme();

    setTimeout(() => {
        // useLayoutEffect(() => {
        (async () => {
            // await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
            const token = await AsyncStorage.getItem("token");
            if (token != null) {
                const role = await AsyncStorage.getItem("role");
                if (role == "user") {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "main_navigator", params: { from: "splash" } }]
                        }));
                }
                else if (role == "factory_man") {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "factory_navigator", params: { from: "splash" } }]
                        }));
                }
                else if (role == "driver") {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "courier_driver_navigator", params: { from: "splash" } }]
                        }));
                }
            } else {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "login_screen" }]
                    }));
            }
        })();
        // },[])
    }, 3000)


    return (
        <View style={styles.container}>
            <Image source={colorScheme.colorScheme === 'light' ? require('../assets/animations/logo-loading-white.gif') : require('../assets/animations/logo-loading-black.gif')} style={{ width: '100%', height: '100%' }} />
        </View>
    )
}

export default LoadingRole

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})