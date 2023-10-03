import React, { useState } from 'react';
import TextTitle from "../typography/TextTitle";
import Button from "../../components/Button";

import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  Text
} from 'react-native';

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
        <TextTitle content="Login" />

        {/* TODO: import subTitle when finished */}
        <Text style={styles.marginBottom}>Please enter your credentials</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.marginBottom}>Username</Text>
          <TextInput
            style={[styles.input, styles.marginBottom]}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.marginBottom}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* TODO: onPress handleLogin */}
        <Button text="Login" customStyles={styles.loginButton} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 40,
  },
  subTitle: {
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  marginBottom: {
    marginBottom: 10
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginModal;
