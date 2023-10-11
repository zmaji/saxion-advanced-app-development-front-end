import type { User } from '../typings/User';

import axios from 'axios';

// TODO: Change to AWS IP
const BASE_URL = 'http://192.168.2.3:3000';

const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data
  } catch (error) {
    throw error;
  }
}

const getUser = async (userId: string): Promise<User | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const postUser = async (newUser: User): Promise<User> => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, newUser);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const editUser = async (userId: string, updatedUser: User): Promise<User> => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const deleteUser = async (userId: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/users/${userId}`);
  } catch (error) {
    throw error;
  }
}

const PostController = {
  getUsers,
  getUser,
  postUser,
  editUser,
  deleteUser
};

export default PostController;