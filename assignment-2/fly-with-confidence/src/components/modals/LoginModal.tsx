import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';
import { inputStyles } from '../../styles/inputs';
import { themeColors } from '../../styles/themeColors';
import { globalStyles } from '../../styles/global';
import TextTitle from '../typography/TextTitle';
import Button from '../buttons/Button';
import TextButton from '../buttons/TextButton';
import TextSubTitle from '../typography/TextSubTitle';
import FormLabel from '../typography/FormLabel';
import InputError from "../error/InputError";

interface LoginModalProps {
  isVisible: boolean;
  closeLoginModal: () => void;
  onLogin: (username: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isVisible, closeLoginModal, onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleLogin = () => {
    setUsernameError('');
    setPasswordError('');

    let isValid = true;

    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid)
      onLogin(username, password);
  };

  const handleCloseModal = () => {
    setUsername('');
    setPassword('');
    setUsernameError('');
    setPasswordError('');
    closeLoginModal();
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={closeLoginModal}
    >
      <View style={styles.modalView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextTitle content='Login' />

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
              <FormLabel content={'Password'} />
              <TextInput
                style={inputStyles.formInput}
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />

              {passwordError ? (<InputError content={passwordError} color='error'></InputError>) : null}
            </View>
          </View>

          <Button text='Login' customStyles={styles.loginButton} onPress={handleLogin} />

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
  loginButton: {
    alignSelf: 'center',
  },
});

export default LoginModal;
