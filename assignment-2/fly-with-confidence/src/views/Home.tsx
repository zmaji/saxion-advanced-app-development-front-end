import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SvgXml } from "react-native-svg";
import { globalStyles } from "../styles/global";
import Button from "../components/Button";

const homeRectangleXml = `
    <svg width="100%" height="100%" viewBox="0 0 320 298" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 110.283L320 0V298H0L0 110.283Z" fill="#87CEEB"/>
    </svg>
`;

// @ts-ignore
export default function Home({ navigation }) {
    return (
        <ImageBackground
            source={require('../../assets/images/home-bg.jpg')}
            style={styles.backgroundImage}
        >
            <SvgXml xml={homeRectangleXml} style={styles.backgroundSvg}/>
            <View style={styles.container}>

                <Text style={[styles.header, globalStyles.marginBottomCustom(10)]}>Fly with Confidence</Text>
                <Text style={[styles.subHeader, globalStyles.marginBottomCustom(50)]}>Reduce your fear of flight</Text>

                <Button text="Sign up" customStyles={globalStyles.marginBottom} onPress={() => navigation.navigate('SelectionScreen')}/>
                
                <Button text="Enter as guest" buttonColor="secondary" customStyles={{marginBottom: 35}} onPress={() => navigation.navigate('SelectionScreen')}/>

                <Text style={globalStyles.textColorWhite}>
                    Already have an account?{' '}

                    <Text
                        style={[globalStyles.textColorWhite, globalStyles.montserratBold, styles.loginLink]}
                        onPress={() => navigation.navigate('SelectionScreen')}
                    >Login</Text>
                </Text>
                <StatusBar style="auto" />
            </View>
        </ImageBackground>
    );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
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
        color: 'white'
    },
    subHeader: {
        fontFamily: 'Lora-Medium-Italic',
        fontSize: 16,
        color: 'white'
    },
    loginLink: {
        textDecorationLine: 'underline'
    }
});
