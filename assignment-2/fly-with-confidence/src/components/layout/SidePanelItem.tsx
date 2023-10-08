import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { themeColors, themeColorUtils } from '../../styles/themeColors';
import { fontFamilyStyles, typographyStyles } from '../../styles/typography';

type SidePaneItemProps = {
    title: string,
    onPress: () => void,
    active?: boolean
};

const SidePanelItem: React.FC<SidePaneItemProps> = ({ title, onPress, active }) => {
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
            style={[styles.sidePanelItem, isPressed && styles.sidePaneItemPressed, active && styles.activeItem]}
            onPress={onPress}
        >
            <Text style={[styles.sidePaneItemTitle, isPressed && themeColorUtils.textColorPrimary, active && styles.activeItemText]}>{title}</Text>

            {active && <FontAwesomeIcon icon={faCircle} size={16} color={themeColors.white} />}
            {!active && <FontAwesomeIcon icon={faChevronRight} size={16} color={isPressed && themeColors.primary || themeColors.darkGrey} />}
        </TouchableOpacity>
        );
};

const styles = StyleSheet.create({
    sidePanelItem: {
        backgroundColor: themeColors.white,
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: themeColors.lightGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sidePaneItemPressed: {
        borderColor: themeColors.primary,
    },
    sidePaneItemTitle: {
        ...typographyStyles.baseFontSize,
        ...fontFamilyStyles.montserratRegular
    },
    activeItem: {
        backgroundColor: themeColors.primary
    },
    activeItemText: {
        color: themeColors.white
    }
});

export default SidePanelItem;
