import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles } from '../styles/global';
import { themeColorUtils } from '../styles/themeColors';
import { fontFamilyStyles, typographyStyles } from '../styles/typography';
import { Button, LoginModal, RegisterModal } from '../components';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function Home({ navigation }) {
  const [isLoginModalVisible, setLoginModalVisible] = React.useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = React.useState(false);

  const openLoginModal = () => {
    setLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const openRegisterModal = () => {
    setRegisterModalVisible(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalVisible(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/home-bg.jpg')}
      style={styles.backgroundImage}
    >
      <LinearGradient colors={['transparent', 'rgba(0,0,50,.35)']} style={styles.linearGradient} />

      <View style={styles.container}>
        <Text style={styles.header}>Fly with Confidence</Text>
        <Text style={styles.subHeader}>Reduce your fear of flight</Text>

        <Button text='Sign up' customStyles={globalStyles.marginBottom} onPress={openRegisterModal} />

        <Button
          text='Enter as guest'
          buttonColor='secondary'
          customStyles={{ marginBottom: 35 }}
          onPress={() => navigation.navigate('SelectionScreen')}
        />

        <Text style={[themeColorUtils.textColorWhite, { fontSize: 16 }]}>
          Already have an account?{' '}

          <Text
            style={[themeColorUtils.textColorWhite, fontFamilyStyles.montserratBold, styles.loginLink]}
            onPress={openLoginModal}
          >Login</Text>
        </Text>

        <LoginModal
          isVisible={isLoginModalVisible}
          closeLoginModal={closeLoginModal}
          onLoginSuccess={() => navigation.navigate('SelectionScreen')}
        />

        <RegisterModal
          isVisible={isRegisterModalVisible}
          closeRegisterModal={closeRegisterModal}
          onRegisterSuccess={() => navigation.navigate('HomeScreen')}
        />

        <StatusBar style='auto' />
      </View>
    </ImageBackground>
  );
}

const windowHeight = Dimensions.get('window').height;
const statusBarHeight = getStatusBarHeight();

const styles = StyleSheet.create({
  backgroundImage: {
    height: windowHeight + statusBarHeight,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'relative',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: (25 / 100) * windowHeight,
  },
  header: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: 'white',
    marginBottom: 10,
  },
  subHeader: {
    fontFamily: 'Lora-Medium-Italic',
    fontSize: 20,
    color: 'white',
    marginBottom: 50,
  },
  loginLink: {
    textDecorationLine: 'underline',
    ...typographyStyles.baseFontSize,
  },
});
