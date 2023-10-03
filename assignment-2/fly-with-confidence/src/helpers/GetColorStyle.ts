import { globalStyles } from "../styles/global";

export const getTextColorStyle = (color: string) => {
    switch (color) {
        case 'primary':
            return globalStyles.textColorPrimary;
        case 'secondary':
            return globalStyles.textColorSecondary;
        case 'white':
            return globalStyles.textColorWhite;
        case 'grey':
            return globalStyles.textColorGrey;
        case 'lightGrey':
            return globalStyles.textColorLightGrey;
        case 'darkGrey':
            return globalStyles.textColorDarkGrey;
        case 'warning':
            return globalStyles.textColorWarning;
        case 'error':
            return globalStyles.textColorError;
        case 'success':
            return globalStyles.textColorSuccess;
        default:
            return globalStyles.textColorDarkGrey;
    }
};

export const getBackgroundColorStyle = (color: string) => {
    switch (color) {
        case 'primary':
            return globalStyles.backgroundColorPrimary;
        case 'secondary':
            return globalStyles.backgroundColorSecondary;
        case 'white':
            return globalStyles.backgroundColorWhite;
        case 'grey':
            return globalStyles.backgroundColorGrey;
        case 'lightGrey':
            return globalStyles.backgroundColorLightGrey;
        case 'darkGrey':
            return globalStyles.backgroundColorDarkGrey;
        case 'warning':
            return globalStyles.backgroundColorWarning;
        case 'error':
            return globalStyles.backgroundColorError;
        case 'success':
            return globalStyles.backgroundColorSuccess;
        default:
            return globalStyles.backgroundColorDarkGrey;
    }
};