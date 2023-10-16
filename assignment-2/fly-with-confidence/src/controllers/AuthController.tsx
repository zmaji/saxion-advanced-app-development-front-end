import type { UserCredentials } from '../typings/User';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';

const loginUser = async (user: UserCredentials): Promise<string | null> => {
  console.log('entering login function');
  try {
    console.log('sending request with credentials:', user);
    const response = await axios.post(`${BASE_URL}/credentials`, user);
    if (response) {
      await AsyncStorage.setItem('token', JSON.stringify(response.data));
    }
    console.log('response', response.data);
    return response.data
  } catch (error) {
    throw error;
  }
}

const AuthController = {
  loginUser
};

export default AuthController;