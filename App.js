import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts, FiraSans_400Regular, FiraSans_500Medium, FiraSans_300Light } from '@expo-google-fonts/fira-sans';


import LoadingRole from './screens/LoadingRole';

import LoginScreen from './screens/LoginScreen';
import CodeScreen from './screens/CodeScreen';

import MainNavigator from './navigators/MainNavigator';
import AboutGridScreen from './screens/user/AboutGridScreen';
import LocationScreen from './screens/user/LocationScreen';
import NotificationsScreen from './screens/user/NotificationsScreen';
import CreatePhotoScreen from './screens/user/CreatePhotoScreen';
import OrderCompletionScreen from './screens/user/OrderCompletionScreen';


import FactoryNavigator from './navigators/FactoryNavigator';
import AddMaterialScreen from './screens/factory/AddMaterialScreen'
import SellScreen from './screens/factory/SellScreen'

import CourierDriverNavigator from './navigators/CourierDriverNavigator'

export default function App() {

  const Stack = createNativeStackNavigator()

  let [fontsLoaded] = useFonts({
    FiraSans_400Regular, FiraSans_500Medium, FiraSans_300Light
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='loading_role' >

        <Stack.Screen options={{ headerShown: false }} name='loading_role' component={LoadingRole} />

        <Stack.Screen options={{ headerShown: false }} name='login_screen' component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name='code_screen' component={CodeScreen} />

        <Stack.Screen options={{ headerShown: false }} name='main_navigator' component={MainNavigator} />
        <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name='about_grid_screen' component={AboutGridScreen} />
        <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name='location_screen' component={LocationScreen} />
        <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name='notifications_screen' component={NotificationsScreen} />
        <Stack.Screen options={{ headerShown: false }} name='create_photo_screen' component={CreatePhotoScreen} />
        <Stack.Screen options={{ headerShown: false }} name='order_completion_screen' component={OrderCompletionScreen} />

        <Stack.Screen options={{ headerShown: false }} name='factory_navigator' component={FactoryNavigator} />
        <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="add_material_screen" component={AddMaterialScreen} />
        <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="sell_screen" component={SellScreen} />

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
