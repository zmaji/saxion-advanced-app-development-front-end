import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

export const globalStyles = StyleSheet.create({
    marginBottom: {
        marginBottom: 25,
    },
    pageContainer: {
        padding: 25,
        paddingTop: 25 + statusBarHeight
    },
});
