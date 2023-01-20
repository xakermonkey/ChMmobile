import { useColorScheme } from 'react-native'
import { colors } from './colors'


const styleScheme = () => {
    const colorScheme = 'light' //= useColorScheme()
    const themeContainerStyle = colorScheme === 'light' ? colors.lightContainer : colors.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? colors.lightText : colors.darkText;
    const themeSubTextStyle = colorScheme === 'light' ? colors.lightSubText : colors.darkSubText;
    const themeContainerSelectStyle = colorScheme === 'light' ? colors.lightContainerSelect : colors.darkContainerSelect;

    return { themeContainerStyle, themeTextStyle, themeSubTextStyle, themeContainerSelectStyle, colorScheme }
}
export default styleScheme
