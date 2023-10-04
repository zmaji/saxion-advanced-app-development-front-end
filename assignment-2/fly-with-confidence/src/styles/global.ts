import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {themeColors} from "./themeColors";

const statusBarHeight = getStatusBarHeight();

export const globalStyles = StyleSheet.create({
    marginBottom: {
        marginBottom: 25,
    },
    pageContainer: {
        backgroundColor: themeColors.white,
        padding: 25,
        paddingTop: 25 + statusBarHeight,
        minHeight: "100%"
    },
    defaultShadow: {
        shadowColor: '#002E74',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 5,
    }
});
