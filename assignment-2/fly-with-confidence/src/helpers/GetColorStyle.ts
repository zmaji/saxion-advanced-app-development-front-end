import { globalStyles } from "../styles/global";

export const getColorStyle = (color: string) => {
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