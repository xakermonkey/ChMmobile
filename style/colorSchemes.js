import { useColorScheme } from 'react-native'
import { colors } from './colors'
import { StyleSheet } from 'react-native';


const styleScheme = () => {
    const colorScheme = useColorScheme()
    const themeContainerStyle = colorScheme === 'light' ? colors.lightContainer : colors.darkContainer;
    const themeTextStyle = colorScheme === 'light' ? colors.lightText : colors.darkText;
    const themeTextStyle2 = colorScheme === 'light' ? colors.lightText : colors.lightText;
    const themeSubTextStyle = colorScheme === 'light' ? colors.lightSubText : colors.darkSubText;

    const gradientHeader = ['#75C860', '#C4FEB6'];
    const styles = StyleSheet.create({
        // text400_14: {
        //     color: themeTextStyle.color,
        //     fontFamily: 'FiraSans_400Regular',
        //     fontSize: 14,
        // },
        
        // text400_16_2: {
        //     color: themeTextStyle2.color,
        //     fontFamily: 'FiraSans_400Regular',
        //     fontSize: 16,
        // },
        // text400_20: {
        //     color: themeTextStyle.color,
        //     fontFamily: 'FiraSans_400Regular',
        //     fontSize: 20,
        // },

        // text500_20: {
        //     color: themeTextStyle.color,
        //     fontFamily: 'FiraSans_500Medium',
        //     fontSize: 20,
        // },
//================================================================================================
        rowBetweenCenter: {
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        },
        centerCenter: {
            justifyContent: 'center', alignItems: 'center'
        },


        title: { // заголовок блока
            color: themeTextStyle.color,
            fontFamily: 'FiraSans_500Medium',
            fontSize: 22,
        },
        subTitle: { // пояснение заголовка блока
            color: themeSubTextStyle.color,
            fontFamily: 'FiraSans_300Light',
            fontSize: 16,
        },
        text400_16: {
            color: themeTextStyle.color,
            fontFamily: 'FiraSans_400Regular',
            fontSize: 16,
        },
        
        btnText: { // текст в кнопке шапки
            color: colors.greenText.color,
            fontFamily: 'FiraSans_500Medium',
            fontSize: 18,
        },
        btnHeader: { // сама кнопка в шапке
            backgroundColor: 'white',
            padding: '3%',
            borderRadius: '50%',
            // width: '55%',
        },


        roundBtn: { // круглые кнопки
            backgroundColor: 'white',
            padding: '2%',
            borderRadius: '50%',
            width: 40,
            height: 40,
        },


        btn: {
            width: 72,
            height: 72,
            borderRadius: 72,
            alignItems: 'center',
            justifyContent: 'center',
            // marginLeft:24
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 24,
            // paddingHorizontal:'15%'
            width: 300
        },

    })

    return { themeContainerStyle, themeTextStyle, themeTextStyle2, themeSubTextStyle, colorScheme, styles, gradientHeader }
}


export default styleScheme
