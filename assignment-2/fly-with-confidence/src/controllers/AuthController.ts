import type { UserCredentials } from '../typings/User';

import axios from 'axios';
import { BASE_URL } from '../../config';

const loginUser = async (user: UserCredentials): Promise<string | null> => {
  try {
    const response = await axios.post(`${BASE_URL}/credentials`, user);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const AuthController = {
  loginUser,
};

export default AuthController;
