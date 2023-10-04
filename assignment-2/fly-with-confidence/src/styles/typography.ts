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
        color: themeColors.darkGrey,
        marginBottom: 5,
        ...fontFamilyStyles.montserratBold
    },
    pageSubTitle: {
        fontSize: 12,
        color: themeColors.darkGrey,
        marginBottom: 5,
        ...fontFamilyStyles.loraItalic
    },
    regularText: {
        fontSize: 12,
        color: themeColors.darkGrey,
        marginBottom: 20,
        ...fontFamilyStyles.montserratRegular
    },
    formLabel: {
        fontSize: 12,
        color: themeColors.lightGrey,
        marginBottom: 5,
        ...fontFamilyStyles.montserratRegular
    }
});
