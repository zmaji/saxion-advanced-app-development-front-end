import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComments, faNewspaper, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronRight,
  faGraduationCap,
  faHandHoldingMedical,
  faPlaneDeparture,
  faSpa,
} from '@fortawesome/free-solid-svg-icons';
import { themeColors, themeColorUtils } from '../styles/themeColors';
import { fontFamilyStyles, typographyStyles } from '../styles/typography';

type SelectionItemProps = {
    title: string,
    icon?: string,
    onPress: () => void;
};

const textIcons: Record<string, IconDefinition> = {
  'newspaper': faNewspaper,
  'graduation-cap': faGraduationCap,
  'spa': faSpa,
  'plane-departure': faPlaneDeparture,
  'comments': faComments,
  'hand-holding-medical': faHandHoldingMedical,
};

const SelectionItem: React.FC<SelectionItemProps> = ({ title, icon, onPress }) => {
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
      <Text style={[styles.selectionItemTitle, isPressed && themeColorUtils.textColorPrimary]}>
        {icon && (
          <View style={styles.textIconContainer}>
            <FontAwesomeIcon icon={textIcons[icon]} style={styles.textIcon}/>
          </View>
        )}
        {title}
      </Text>

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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectionItemPressed: {
    borderColor: themeColors.primary,
  },
  selectionItemTitle: {
    ...typographyStyles.baseFontSize,
    ...fontFamilyStyles.montserratRegular,
  },
  textIconContainer: {
    paddingRight: 15,
  },
  textIcon: {
    color: themeColors.primary,
  },
});

export default SelectionItem;
