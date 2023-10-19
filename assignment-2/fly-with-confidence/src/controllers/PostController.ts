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

const createPost = async (postData: PostFormData, authToken: string): Promise<PostFormData | null> => {
  console.log('creating post');
  console.log('authToken', authToken);
  console.log('postData', postData);
  try {
    const response = await axios.post<Post | null>(`${BASE_URL}/posts`, postData, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response.data);

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
