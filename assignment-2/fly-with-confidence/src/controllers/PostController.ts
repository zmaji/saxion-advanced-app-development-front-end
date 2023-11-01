import type {
  PostFormData,
  Post,
  PostDetail,
  SimplePost,
} from '../typings/Post';

import axios from 'axios';
import { BASE_URL } from '../../config';

const getPosts = async (): Promise<SimplePost[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPost = async (postID: string): Promise<PostDetail | undefined> => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const createPost = async (postData: FormData, authToken: string): Promise<PostFormData | null> => {
  try {
    const response = await axios.post<Post | null>(`${BASE_URL}/posts`, postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const PostController = {
  getPosts,
  getPost,
  createPost,
};

export default PostController;
