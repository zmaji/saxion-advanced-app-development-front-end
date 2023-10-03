import { StyleSheet } from 'react-native';
import { themeColors } from './themeColors';

export const fontFamilyStyles = {
    loraBoldItalic: {
        fontFamily: 'Lora-Bold-Italic',
    },
    loraMediumItalic: {
        fontFamily: 'Lora-Medium-Italic',
    },
    loraItalic: {
        fontFamily: 'Lora-Italic',
    },
    montserratMedium: {
        fontFamily: 'Montserrat-Medium',
    },
    montserratBold: {
        fontFamily: 'Montserrat-Bold',
    },
    montserratRegular: {
        fontFamily: 'Montserrat-Regular',
    },
}

export const typographyStyles = StyleSheet.create({
    pageTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: themeColors.darkGrey
    }
});
