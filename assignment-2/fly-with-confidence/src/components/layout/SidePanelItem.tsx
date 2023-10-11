import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowRightFromBracket,
    faChevronRight,
    faGraduationCap,
    faHandHoldingMedical,
    faPlaneDeparture,
    faSpa
} from '@fortawesome/free-solid-svg-icons';
import {
    faCircle,
    faComments,
    faCircleUser,
    faNewspaper,
    IconDefinition
} from '@fortawesome/free-regular-svg-icons';
import { themeColors, themeColorUtils } from '../../styles/themeColors';
import { fontFamilyStyles, typographyStyles } from '../../styles/typography';

type SidePaneItemProps = {
    title: string,
    icon?: string,
    onPress: () => void,
    active?: boolean
};

const textIcons: Record<string, IconDefinition> = {
    'newspaper': faNewspaper,
    'graduation-cap': faGraduationCap,
    'spa': faSpa,
    'plane-departure': faPlaneDeparture,
    'comments': faComments,
    'hand-holding-medical': faHandHoldingMedical,
    'circle-user': faCircleUser,
    'arrow-right-from-bracket': faArrowRightFromBracket,
};

const SidePanelItem: React.FC<SidePaneItemProps> = ({ title, icon, onPress, active }) => {
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
            <Text style={[styles.sidePaneItemTitle, isPressed && themeColorUtils.textColorPrimary, active && styles.activeItemText]}>
                {icon && (
                    <View style={styles.textIconContainer}>
                        <FontAwesomeIcon icon={textIcons[icon]} style={[styles.textIcon, active && styles.activeItemText]}/>
                    </View>
                )}

                {title}
            </Text>

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
    textIconContainer: {
        paddingRight: 15,
    },
    textIcon: {
        color: themeColors.primary
    },
    activeItem: {
        backgroundColor: themeColors.primary
    },
    activeItemText: {
        color: themeColors.white
    }
});

export default SidePanelItem;
