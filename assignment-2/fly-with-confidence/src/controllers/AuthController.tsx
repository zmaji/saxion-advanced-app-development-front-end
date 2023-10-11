import type { User } from '../typings/User';

import axios from 'axios';

// TODO: Change to AWS IP
const BASE_URL = 'http://192.168.2.3:3000';

const loginUser = async (existingUser: User): Promise<string | null> => {
  try {
    const response = await axios.post(`${BASE_URL}/credentials/login`, existingUser);
    return response.data
  } catch (error) {
    throw error;
  }
}

const AuthController = {
  loginUser
};

export default AuthController;