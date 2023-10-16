import type {
  BasicPost,
  Post,
  PostDetail,
  SimplePost
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

const createPost = async (postData: BasicPost): Promise<BasicPost | null> => {
  // TODO: Change to getting token from store
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1NDU5MzEzYi03ZGI1LTQ1NjUtODcxMC04YWVlY2U3YzdmNzkiLCJlbWFpbCI6InptYWppQHNheGlvbi5ubCIsInJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJpYXQiOjE2OTc0NDgwMDd9.EXuUObrfY_cNF-XtMMQ5EzHwLgp0taMUa1hoELLBv7w";

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
