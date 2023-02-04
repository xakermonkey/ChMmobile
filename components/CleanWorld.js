import { View, Image, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const CleanWorld = () => {
    return (
        <View style={{ alignItems: 'center', backgroundColor: '#C4FEB6' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: '4%' }}>
                <Image source={require('../assets/test_logo.png')} style={{ width: 70, height: 70 }}></Image>
                <Text style={{ marginLeft: '5%', width: '70%', color: '#1E1E1E',
            fontFamily: 'FiraSans_400Regular',
            fontSize: 16, }}>Чистый мир - это компания, которая заботится об экологии и безвозмездно поможет Вам с вывозом мусора.</Text>
            </View>
        </View>
    )
}
export default CleanWorld
