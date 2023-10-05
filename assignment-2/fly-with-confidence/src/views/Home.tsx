import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as React from "react";
import { SvgXml } from "react-native-svg";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { StatusBar } from "expo-status-bar";
import { globalStyles } from "../styles/global";
import { themeColorUtils } from "../styles/themeColors";
import { fontFamilyStyles } from "../styles/typography";
import Button from "../components/buttons/Button";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";

const homeRectangleXml = `
    <svg width="100%" height="100%" viewBox="0 0 320 298" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 110.283L320 0V298H0L0 110.283Z" fill="#87CEEB"/>
    </svg>
`;

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
      <SvgXml xml={homeRectangleXml} style={styles.backgroundSvg} />
      <View style={styles.container}>

        <Text style={styles.header}>Fly with Confidence</Text>
        <Text style={styles.subHeader}>Reduce your fear of flight</Text>

        <Button text="Sign up" customStyles={globalStyles.marginBottom} onPress={openRegisterModal} />

        <Button
            text="Enter as guest"
            buttonColor="secondary"
            customStyles={{ marginBottom: 35 }}
            onPress={() => navigation.navigate('SelectionScreen')}
        />

        <Text style={themeColorUtils.textColorWhite}>
          Already have an account?{' '}

          <Text
            style={[themeColorUtils.textColorWhite, fontFamilyStyles.montserratBold, styles.loginLink]}
            onPress={openLoginModal}
          >Login</Text>
        </Text>

        <LoginModal
          isVisible={isLoginModalVisible}
          closeLoginModal={closeLoginModal}
        />

        <RegisterModal
          isVisible={isRegisterModalVisible}
          closeRegisterModal={closeRegisterModal}
        />

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const windowHeight = Dimensions.get('window').height;
const statusBarHeight = getStatusBarHeight();

const styles = StyleSheet.create({
  backgroundImage: {
    height: windowHeight + statusBarHeight,
    width: "100%",
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'relative'
  },
  backgroundSvg: {
    position: 'absolute',
    top: '30%',
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
    fontSize: 24,
    color: 'white',
    marginBottom: 10
  },
  subHeader: {
    fontFamily: 'Lora-Medium-Italic',
    fontSize: 16,
    color: 'white',
    marginBottom: 50
  },
  loginLink: {
    textDecorationLine: 'underline'
  }
});
