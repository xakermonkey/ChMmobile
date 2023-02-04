import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const QuestionButton = () => {
    return (
        <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: '#75C860', padding: '2%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign name="question" size={24} color="black" />
        </TouchableOpacity>
    )
}
export default QuestionButton
