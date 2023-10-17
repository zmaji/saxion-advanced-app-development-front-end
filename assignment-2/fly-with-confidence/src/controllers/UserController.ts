import type { User } from '../typings/User';

import axios from 'axios';
import { BASE_URL } from '../../config';

const postUser = async (newUser: User): Promise<User | null> => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, newUser);

    return response.data;
  } catch (error) {
    return null;
  }
};

const UserController = {
  postUser,
};

export default UserController;
