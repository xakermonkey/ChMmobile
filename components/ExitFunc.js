import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Exit = async (navigation) => {
    await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: "login_screen" }]
        }));
}
