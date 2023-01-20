import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';

import LoginScreen from './screens/LoginScreen';
import CodeScreen from './screens/CodeScreen';
import MainNavigator from './screens/MainNavigator';


import FactoryNavigator from './screens/FactoryNavigator';
import AddMaterialScreen from './screens/AddMaterialScreen'
import SellScreen from './screens/SellScreen'

import CourierDriverNavigator from './screens/CourierDriverNavigator'

export default function App() {

  const Stack = createNativeStackNavigator()

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='courier_driver_navigator' >

        <Stack.Screen options={{ headerShown: false }} name='login_screen' component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name='code_screen' component={CodeScreen} />

        <Stack.Screen options={{ headerShown: false }} name='main_navigator' component={MainNavigator} />

        <Stack.Screen options={{ headerShown: false }} name='factory_navigator' component={FactoryNavigator} />
        <Stack.Screen options={{ headerShown: false, presentation:'modal' }} name="add_material_screen" component={AddMaterialScreen} />
        <Stack.Screen options={{ headerShown: false, presentation:'modal' }} name="sell_screen" component={SellScreen} />

        <Stack.Screen options={{ headerShown: false }} name='courier_driver_navigator' component={CourierDriverNavigator} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
