import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { themeColors, themeColorUtils } from '../styles/themeColors';
import { fontFamilyStyles, typographyStyles } from '../styles/typography';

type SelectionItemProps = {
    title: string,
    onPress: () => void;
};

const SelectionItem: React.FC<SelectionItemProps> = ({ title, onPress }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
            style={[styles.selectionItem, isPressed && styles.selectionItemPressed]}
            onPress={onPress}
        >
            <Text style={[styles.selectionItemTitle, isPressed && themeColorUtils.textColorPrimary]}>{title}</Text>

            <FontAwesomeIcon icon={faChevronRight} color={isPressed && themeColors.primary || themeColors.darkGrey}/>
        </TouchableOpacity>
        );
};

const styles = StyleSheet.create({
    selectionItem: {
        backgroundColor: themeColors.white,
        padding: 15,
        paddingLeft: 0,
        borderBottomWidth: 1,
        borderBottomColor: themeColors.lightGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectionItemPressed: {
        borderColor: themeColors.primary,
    },
    selectionItemTitle: {
        ...typographyStyles.baseFontSize,
        ...fontFamilyStyles.montserratRegular
    },
});

export default SelectionItem;
