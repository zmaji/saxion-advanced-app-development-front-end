import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { themeColors } from '../../styles/themeColors';
import { fontFamilyStyles, typographyStyles } from '../../styles/typography';
import TextTitle from '../typography/TextTitle';
import SidePanelItem from './SidePanelItem';

const statusBarHeight = getStatusBarHeight();

// @ts-ignore
const SidePanelItems = ({ navigation, activeItem }) => {
  const closeSidePanel = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View style={styles.sidePanelContainer}>
      <View style={styles.sidePanelHeader}>
        <TextTitle content={'Menu'} />

        <TouchableOpacity onPress={closeSidePanel} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
          <FontAwesomeIcon icon={faXmark} size={24} color={themeColors.darkGrey} />
        </TouchableOpacity>
      </View>

      <SidePanelItem
        title={'Articles'}
        onPress={() => navigation.navigate('CategoryOverview')}
        active={activeItem === 'CategoryOverview' || activeItem === 'ArticleOverview'}
      />
      <SidePanelItem
        title={'Education and information'}
        onPress={() => navigation.navigate('SelectionScreen')}
        active={activeItem === ''}
      />
      <SidePanelItem
        title={'Mindfulness'}
        onPress={() => navigation.navigate('SelectionScreen')}
        active={activeItem === ''}
      />
      <SidePanelItem
        title={'Flight information'}
        onPress={() => navigation.navigate('SelectionScreen')}
        active={activeItem === ''}
      />
      <SidePanelItem
        title={'Forum and discussion'}
        onPress={() => navigation.navigate('ForumOverview')}
        active={activeItem === 'ForumOverview'}
      />
      <SidePanelItem
        title={'Professional help'}
        onPress={() => navigation.navigate('SelectionScreen')}
        active={activeItem === ''}
      />
      <SidePanelItem
        title={'My profile'}
        onPress={() => navigation.navigate('SelectionScreen')}
        active={activeItem === ''}
      />
      <SidePanelItem
        title={'Logout'}
        onPress={() => navigation.navigate('SelectionScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sidePanelContainer: {
    paddingTop: statusBarHeight + 10,
    backgroundColor: themeColors.white
  },
  sidePanelHeader: {
    paddingBottom: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeText: {
    marginRight: 5,
    color: themeColors.darkGrey,
    textDecorationLine: 'underline',
    ...typographyStyles.baseFontSize,
    ...fontFamilyStyles.montserratRegular
  },
  sidePanelButton: {
    backgroundColor: themeColors.primary,
    padding: 15,
    borderRadius: 100
  }
});

export default SidePanelItems;
