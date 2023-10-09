import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { inputStyles } from '../../styles/inputs';
import { themeColors } from '../../styles/themeColors';
import { globalStyles } from '../../styles/global';
import TextTitle from '../typography/TextTitle';
import Button from '../buttons/Button';
import TextButton from '../buttons/TextButton';
import TextSubTitle from '../typography/TextSubTitle';
import FormLabel from '../typography/FormLabel';
import InputError from '../error/InputError';

interface RegisterModalProps {
  isVisible: boolean;
  closeRegisterModal: () => void;
  onRegister: (username: string, email: string, password: string) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isVisible, closeRegisterModal, onRegister }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<string>('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setPasswordConfirmationError('');

    let isValid = true;

    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Email is not valid');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    }

    if (!passwordConfirmation) {
      setPasswordConfirmationError('Password confirmation is required');
      isValid = false;
    }

    if (password !== passwordConfirmation) {
      setPasswordConfirmationError('Passwords do not match');
      isValid = false;
    }

    if (isValid) {
      onRegister(username, email, password);
    }
  };

  const handleCloseModal = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setPasswordConfirmationError('');
    closeRegisterModal();
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={closeRegisterModal}
    >
      <View style={styles.modalView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextTitle content='Register' />

          <TextSubTitle content={'Please enter your credentials'} customStyles={{ marginBottom: 20 }} />

          <View style={inputStyles.formContainer}>
            <View style={inputStyles.formField}>
              <FormLabel content={'Username'} />
              <TextInput
                style={inputStyles.formInput}
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
              />

              {usernameError ? (<InputError content={usernameError} color='error'></InputError>) : null}
            </View>

            <View style={inputStyles.formField}>
              <FormLabel content={'Email'} />
              <TextInput
                style={inputStyles.formInput}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
              />

              {usernameError ? (<InputError content={emailError} color='error'></InputError>) : null}
            </View>

            <View style={inputStyles.formField}>
              <FormLabel content={'Password'} />
              <TextInput
                style={inputStyles.formInput}
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />

              {usernameError ? (<InputError content={passwordError} color='error'></InputError>) : null}
            </View>

            <View style={inputStyles.formField}>
              <FormLabel content={'Repeat password'} />
              <TextInput
                style={inputStyles.formInput}
                placeholder='Confirm Password'
                secureTextEntry={true}
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
              />

              {usernameError ? (<InputError content={passwordConfirmationError} color='error'></InputError>) : null}
            </View>
          </View>

          <Button text='Register' customStyles={styles.registerButton} onPress={handleRegister} />

          <TextButton text={'Cancel'} onPress={handleCloseModal} />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    margin: 25,
    borderRadius: 5,
    backgroundColor: themeColors.white,
    ...globalStyles.defaultShadow,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 25,
  },
  registerButton: {
    alignSelf: 'center',
  },
});

export default RegisterModal;
