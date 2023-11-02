import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../stores/tokenStore';
import { inputStyles } from '../../styles/inputs';
import { themeColors } from '../../styles/themeColors';
import { globalStyles } from '../../styles/global';
import TextTitle from '../typography/TextTitle';
import Button from '../buttons/Button';
import TextButton from '../buttons/TextButton';
import TextSubTitle from '../typography/TextSubTitle';
import FormLabel from '../typography/FormLabel';
import InputError from '../error/InputError';
import AuthController from '../../controllers/AuthController';
import NetworkError from '../../errors/NetworkError';

interface LoginModalProps {
  isVisible: boolean;
  closeLoginModal: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isVisible, closeLoginModal, onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const dispatch = useDispatch();

  const onLogin = async (userName: string, password: string) => {
    const user = { userName, password };
    try {
      const response = await AuthController.loginUser(user);

      if (response && response instanceof NetworkError) {
        Alert.alert('Something went wrong', response.message);
        closeLoginModal();
        resetForm();
      } else if (response) {
        Alert.alert('Login Successful', 'You have successfully logged in.');
        dispatch(setToken(response));
        closeLoginModal();
        onLoginSuccess();
        setPassword('');
        setUsername('');
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid username or password. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setUsernameError('');
    setPasswordError('');
    setLoginError('');
  };

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

    if (isValid) {
      onLogin(username, password);
    }
  };

  const handleCloseModal = () => {
    resetForm();
    closeLoginModal();
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={closeLoginModal}
      testID="loginModal"
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

              {loginError ? (<InputError content={loginError} color='error'></InputError>) : null}
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
