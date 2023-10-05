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
import Button from "../buttons/Button";
import TextButton from "../buttons/TextButton";
import TextSubTitle from "../typography/TextSubTitle";
import FormLabel from "../typography/FormLabel";

interface RegisterModalProps {
  isVisible: boolean;
  closeRegisterModal: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isVisible, closeRegisterModal }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const handleRegister = () => {
    if (password === passwordConfirmation) {
      // Handle registration logic
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
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            <Button text="Register" customStyles={styles.registerButton} onPress={handleRegister}/>

            <TextButton text={'Cancel'} onPress={closeRegisterModal}/>
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
  registerButton: {
    alignSelf: 'center',
  },
});

export default RegisterModal;
