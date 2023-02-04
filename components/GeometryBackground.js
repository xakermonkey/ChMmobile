import { View, Image, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const GeometryBackground = () => {
    return (
        <View style={{ position: 'absolute', bottom: 0, width: '100%',
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image source={require('../assets/items/leaf.png')} style={{ height: 250, width: 250 }} resizeMode='contain' />
                    <Image source={require('../assets/items/triangle.png')} style={{ height: 272, width: 72 }} resizeMode='contain' />
                </View>
    )
}
export default GeometryBackground
