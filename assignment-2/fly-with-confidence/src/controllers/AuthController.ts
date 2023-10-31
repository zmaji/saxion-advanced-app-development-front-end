import type { UserCredentials } from '../typings/User';

import axios from 'axios';
import { BASE_URL } from '../../config';
import { isOnline } from '../utils/NetworkDetection';
import NetworkError from '../errors/NetworkError';

const loginUser = async (user: UserCredentials): Promise<string | NetworkError | null> => {
  try {
    if (await isOnline()) {
      const response = await axios.post(`${BASE_URL}/credentials`, user);

      return response.data;
    } else {
      return new NetworkError();
    }
  } catch (error) {
    throw error;
  }
};

const AuthController = {
  loginUser,
};

export default AuthController;
