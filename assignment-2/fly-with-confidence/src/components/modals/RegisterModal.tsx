import React, { useState } from 'react';
import TextTitle from "../../components/TextTitle";
import Button from "../../components/Button";

import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  Text
} from 'react-native';

interface RegisterModalProps {
  isVisible: boolean;
  closeRegisterModal: () => void;
}

{/* onRegister: (username: string, password: string, email: string) => void; */ }

const RegisterModal: React.FC<RegisterModalProps> = ({ isVisible, closeRegisterModal }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const handleRegister = () => {
    if (password === passwordConfirmation) {
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeRegisterModal}
    >
      <View style={styles.modalView}>
        <TextTitle content="Register" />

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

          <Text style={styles.marginBottom}>Email</Text>
          <TextInput
            style={[styles.input, styles.marginBottom]}
            placeholder="Email"
            secureTextEntry={true}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.marginBottom}>Password</Text>
          <TextInput
            style={[styles.input, styles.marginBottom]}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.marginBottom}>Repeat password</Text>
          <TextInput
            style={[styles.input, styles.marginBottom]}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
          />
        </View>

        {/* TODO: onPress handleLogin */}
        <Button text="Login" customStyles={styles.registerButton} onPress={handleRegister} />
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
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterModal;