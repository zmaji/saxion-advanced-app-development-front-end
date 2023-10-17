import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { setToken } from '../../stores/tokenStore';
import { themeColors } from '../../styles/themeColors';
import { fontFamilyStyles, typographyStyles } from '../../styles/typography';
import TextTitle from '../typography/TextTitle';
import SidePanelItem from './SidePanelItem';
import LoginModal from '../modals/LoginModal';

const statusBarHeight = getStatusBarHeight();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const SidePanelItems = ({ navigation, activeItem, selectedCategory }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: { token: { token: string } }) => state.token.token);

  const [isLoginModalVisible, setLoginModalVisible] = React.useState(false);

  const openLoginModal = () => {
    setLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const closeSidePanel = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const logout = () => {
    dispatch(setToken(''));
  };

  return (
    <View style={styles.sidePanelContainer}>
      <View style={styles.sidePanelHeader}>
        <TextTitle content={'Menu'}/>

        <TouchableOpacity onPress={closeSidePanel} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
          <FontAwesomeIcon icon={faXmark} size={24} color={themeColors.darkGrey}/>
        </TouchableOpacity>
      </View>

      <SidePanelItem
        title={'Articles'}
        icon={'newspaper'}
        onPress={() => navigation.navigate('CategoryOverview')}
        active={activeItem === 'CategoryOverview'}
      />
      <SidePanelItem
        title={'Education and information'}
        icon={'graduation-cap'}
        onPress={() => navigation.navigate('ArticleOverview', { selectedCategory: 'Education and information' })}
        active={activeItem === 'ArticleOverview' && selectedCategory === 'Education and information'}
      />
      <SidePanelItem
        title={'Mindfulness'}
        icon={'spa'}
        onPress={() => navigation.navigate('ArticleOverview', { selectedCategory: 'Mindfulness' })}
        active={activeItem === 'ArticleOverview' && selectedCategory === 'Mindfulness'}
      />
      <SidePanelItem
        title={'Flight information'}
        icon={'plane-departure'}
        onPress={() => navigation.navigate('ArticleOverview', { selectedCategory: 'Flight information' })}
        active={activeItem === 'ArticleOverview' && selectedCategory === 'Flight information'}
      />
      <SidePanelItem
        title={'Forum and discussion'}
        icon={'comments'}
        onPress={() => navigation.navigate('ForumOverview')}
        active={activeItem === 'ForumOverview'}
      />
      <SidePanelItem
        title={'Professional help'}
        icon={'hand-holding-medical'}
        onPress={() => navigation.navigate('SelectionScreen')}
        active={activeItem === ''}
      />

      {token ? (
                    <View>
                      <SidePanelItem
                        title={'My profile'}
                        icon={'circle-user'}
                        onPress={() => navigation.navigate('SelectionScreen')}
                        active={activeItem === ''}
                      />

                      <SidePanelItem
                        title={'Logout'}
                        icon={'arrow-right-from-bracket'}
                        onPress={() => logout()}
                      />
                    </View>

                ) :
                <SidePanelItem
                  title={'Login'}
                  icon={'arrow-right-from-bracket'}
                  onPress={() => openLoginModal()}
                />
      }

      <LoginModal
        isVisible={isLoginModalVisible}
        closeLoginModal={closeLoginModal}
        onLoginSuccess={() => closeSidePanel()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sidePanelContainer: {
    paddingTop: statusBarHeight + 10,
    backgroundColor: themeColors.white,
  },
  sidePanelHeader: {
    paddingBottom: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    ...fontFamilyStyles.montserratRegular,
  },
  sidePanelButton: {
    backgroundColor: themeColors.primary,
    padding: 15,
    borderRadius: 100,
  },
});

export default SidePanelItems;
