import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { themeColors } from "../styles/themeColors";
import {fontFamilyStyles, typographyStyles} from "../styles/typography";

const statusBarHeight = getStatusBarHeight();

const AppHeader = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <TouchableOpacity onPress={handleBackPress} style={styles.backHeader}>
            <FontAwesomeIcon icon={faChevronLeft} color={themeColors.primary}/>

            <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backHeader: {
        padding: 25,
        paddingTop: 10 + statusBarHeight,
        paddingBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 5,
        color: themeColors.primary,
        ...typographyStyles.baseFontSize,
        ...fontFamilyStyles.loraBoldItalic
    },
});

export default AppHeader;
