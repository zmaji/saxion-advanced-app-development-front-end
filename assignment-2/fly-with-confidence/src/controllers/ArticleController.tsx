import type { Article } from '../typings/Article';

import axios from 'axios';
import { BASE_URL } from '../../config';

const getArticles = async (category: string): Promise<Article[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/articles?category=${category}`);
    return response.data
  } catch (error) {
    throw error;
  }
}

const getArticle = async (articleId: string): Promise<Article | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/articles/${articleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const postArticle = async (newArticle: Article): Promise<Article> => {
  try {
    const response = await axios.post(`${BASE_URL}/articles`, newArticle);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const editArticle = async (articleId: string, updatedArticle: Article): Promise<Article> => {
  try {
    const response = await axios.put(`${BASE_URL}/articles/${articleId}`, updatedArticle);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const deleteArticle = async (articleId: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/articles/${articleId}`);
  } catch (error) {
    throw error;
  }
}

const ArticleController = {
  getArticles,
  getArticle,
  postArticle,
  editArticle,
  deleteArticle
};

export default ArticleController;