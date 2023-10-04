import { themeColorUtils } from "../styles/themeColors";

export const getTextColorStyle = (color: string) => {
    switch (color) {
        case 'primary':
            return themeColorUtils.textColorPrimary;
        case 'secondary':
            return themeColorUtils.textColorSecondary;
        case 'white':
            return themeColorUtils.textColorWhite;
        case 'grey':
            return themeColorUtils.textColorGrey;
        case 'lightGrey':
            return themeColorUtils.textColorLightGrey;
        case 'darkGrey':
            return themeColorUtils.textColorDarkGrey;
        case 'warning':
            return themeColorUtils.textColorWarning;
        case 'error':
            return themeColorUtils.textColorError;
        case 'success':
            return themeColorUtils.textColorSuccess;
        default:
            return themeColorUtils.textColorDarkGrey;
    }
};

export const getBackgroundColorStyle = (color: string) => {
    switch (color) {
        case 'primary':
            return themeColorUtils.backgroundColorPrimary;
        case 'secondary':
            return themeColorUtils.backgroundColorSecondary;
        case 'white':
            return themeColorUtils.backgroundColorWhite;
        case 'grey':
            return themeColorUtils.backgroundColorGrey;
        case 'lightGrey':
            return themeColorUtils.backgroundColorLightGrey;
        case 'darkGrey':
            return themeColorUtils.backgroundColorDarkGrey;
        case 'warning':
            return themeColorUtils.backgroundColorWarning;
        case 'error':
            return themeColorUtils.backgroundColorError;
        case 'success':
            return themeColorUtils.backgroundColorSuccess;
        default:
            return themeColorUtils.backgroundColorDarkGrey;
    }
};