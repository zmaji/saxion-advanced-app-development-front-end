import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { buttonStyles } from '../../styles/buttons';
import { themeColors } from '../../styles/themeColors';
import { fontFamilyStyles } from '../../styles/typography';

interface CancelButtonProps {
    text: string,
    customStyles?: Object,
    onPress?: () => void
}

const TextButton: React.FC<CancelButtonProps> = ({ text,  customStyles, onPress }) => {

    return (
        <TouchableOpacity
            style={[styles.cancelButton, customStyles]}
            onPress={onPress}
        >
            <Text style={styles.cancelButtonText}>{text}</Text>
        </TouchableOpacity>
    );
};

export default TextButton;

const styles = StyleSheet.create({
    cancelButton: {
        ...buttonStyles.button,
        elevation: 0,
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    cancelButtonText: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        backgroundColor: themeColors.white,
        color: themeColors.grey,
        ...fontFamilyStyles.montserratMedium
    }
});