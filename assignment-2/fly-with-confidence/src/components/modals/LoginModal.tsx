import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { inputStyles } from "../../styles/inputs";
import { themeColors } from "../../styles/themeColors";
import { globalStyles } from "../../styles/global";
import TextTitle from "../typography/TextTitle";
import Button from "../../components/Button";
import TextSubTitle from "../typography/TextSubTitle";
import FormLabel from "../typography/FormLabel";

interface LoginModalProps {
  isVisible: boolean;
  closeLoginModal: () => void;
}

{/*   onLogin: (username: string, password: string) => void; */ }

const LoginModal: React.FC<LoginModalProps> = ({ isVisible, closeLoginModal }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  {/* 
  const handleLogin = () => {
    onLogin(username, password);
  };
  */}

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeLoginModal}
    >
      <View style={styles.modalView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextTitle content="Login" />

          <TextSubTitle content={'Please enter your credentials'}/>

          <View style={inputStyles.formContainer}>
            <FormLabel content={"Username"}/>
            <TextInput
              style={inputStyles.formInput}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />

            <FormLabel content={"Password"}/>
            <TextInput
              style={inputStyles.formInput}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* TODO: onPress handleLogin */}
          <Button text="Login" customStyles={styles.loginButton} />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    margin: 30,
    borderRadius: 5,
    backgroundColor: themeColors.white,
    ...globalStyles.defaultShadow,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 40,
  },
  loginButton: {
    alignSelf: 'center',
  },
});

export default LoginModal;
