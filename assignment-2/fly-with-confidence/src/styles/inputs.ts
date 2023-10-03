import { StyleSheet } from "react-native";
import { themeColors } from "./themeColors";
import {fontFamilyStyles} from "./typography";

export const inputStyles = StyleSheet.create({
    formContainer: {
        width: '100%',
    },
    formInput: {
        height: 50,
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: themeColors.lightGrey,
        ...fontFamilyStyles.montserratRegular
    },
});