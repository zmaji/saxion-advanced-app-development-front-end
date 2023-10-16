import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { themeColors } from '../../styles/themeColors';
import { fontFamilyStyles, typographyStyles } from '../../styles/typography';

const statusBarHeight = getStatusBarHeight();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const AppHeader = ({ onSidePanelPress }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const openSidePanel = () => {
    if (onSidePanelPress) {
      onSidePanelPress();
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <FontAwesomeIcon icon={faChevronLeft} color={themeColors.primary} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openSidePanel} style={styles.sidePanelButton}>
        <FontAwesomeIcon icon={faBars} color={themeColors.white} size={16} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 25,
    paddingTop: 10 + statusBarHeight,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: themeColors.white,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 5,
    color: themeColors.primary,
    ...typographyStyles.baseFontSize,
    ...fontFamilyStyles.loraBoldItalic,
  },
  sidePanelButton: {
    backgroundColor: themeColors.primary,
    padding: 15,
    borderRadius: 100,
  },
});

export default AppHeader;
