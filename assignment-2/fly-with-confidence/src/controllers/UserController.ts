import type { User } from '../typings/User';

import axios from 'axios';
import { BASE_URL } from '../../config';
import { isOnline } from '../utils/NetworkDetection';
import NetworkError from '../errors/NetworkError';

const postUser = async (newUser: User): Promise<User | NetworkError | null> => {
  try {
    if (await isOnline()) {
      const response = await axios.post(`${BASE_URL}/users`, newUser);

      return response.data;
    } else {
      return new NetworkError();
    }
  } catch (error) {
    return null;
  }
};

const UserController = {
  postUser,
};

export default UserController;
