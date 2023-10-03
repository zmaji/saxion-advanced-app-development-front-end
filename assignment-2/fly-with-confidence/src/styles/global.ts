import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import themeColors from './themeColors';

const statusBarHeight = getStatusBarHeight();

export const globalStyles = StyleSheet.create({
    textColorPrimary: {
        color: themeColors.primary,
    },
    textColorSecondary: {
        color: themeColors.secondary,
    },
    textColorWhite: {
        color: themeColors.white,
    },
    textColorGrey: {
        color: themeColors.grey,
    },
    textColorLightGrey: {
        color: themeColors.lightGrey,
    },
    textColorDarkGrey: {
        color: themeColors.darkGrey,
    },
    textColorWarning: {
        color: themeColors.warning,
    },
    textColorError: {
        color: themeColors.error,
    },
    textColorSuccess: {
        color: themeColors.success,
    },
    backgroundColorPrimary: {
        backgroundColor: themeColors.primary,
    },
    backgroundColorSecondary: {
        backgroundColor: themeColors.secondary,
    },
    backgroundColorWhite: {
        backgroundColor: themeColors.white,
    },
    backgroundColorGrey: {
        backgroundColor: themeColors.grey,
    },
    backgroundColorLightGrey: {
        backgroundColor: themeColors.lightGrey,
    },
    backgroundColorDarkGrey: {
        backgroundColor: themeColors.darkGrey,
    },
    backgroundColorWarning: {
        backgroundColor: themeColors.warning,
    },
    backgroundColorError: {
        backgroundColor: themeColors.error,
    },
    backgroundColorSuccess: {
        backgroundColor: themeColors.success,
    },
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
    button: {
        borderRadius: 5,
        padding: 15,
        elevation: 1,
        minWidth: 170,
    },
    buttonText: {
        fontFamily: 'Montserrat-Medium',
        color: 'white',
        textAlign: 'center',
    },
    buttonPrimary: {
        backgroundColor: themeColors.primary
    },
    buttonSecondary: {
        backgroundColor: themeColors.grey
    },
    marginBottom: {
        marginBottom: 25,
    },
    pageContainer: {
        padding: 25,
        paddingTop: 25 + statusBarHeight
    },
    // @ts-ignore
    marginBottomCustom: (marginValue: number) => ({
        marginBottom: marginValue,
    }),
});
