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
