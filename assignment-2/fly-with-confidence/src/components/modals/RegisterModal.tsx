import React, { useState } from 'react';
import TextTitle from "../typography/TextTitle";
import Button from "../../components/Button";

import {
  Modal,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import TextSubTitle from "../typography/TextSubTitle";
import {inputStyles} from "../../styles/inputs";
import FormLabel from "../typography/FormLabel";
import {themeColors} from "../../styles/themeColors";
import {globalStyles} from "../../styles/global";

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

        <TextSubTitle content={'Please enter your credentials'}/>

        <View style={inputStyles.formContainer}>
          <FormLabel content={"Username"}/>
          <TextInput
            style={inputStyles.formInput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          <FormLabel content={"Email"}/>
          <TextInput
            style={inputStyles.formInput}
            placeholder="Email"
            secureTextEntry={true}
            value={email}
            onChangeText={setEmail}
          />

          <FormLabel content={"Password"}/>
          <TextInput
            style={inputStyles.formInput}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <FormLabel content={"Repeat password"}/>
          <TextInput
            style={inputStyles.formInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
          />
        </View>

        {/* TODO: onPress handleRegister */}
        <Button text="Register" customStyles={styles.registerButton} onPress={handleRegister} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 40,
    margin: 30,
    borderRadius: 5,
    backgroundColor: themeColors.white,
    ...globalStyles.defaultShadow
  },
  registerButton: {
    alignSelf: 'center',
  },
});

export default RegisterModal;