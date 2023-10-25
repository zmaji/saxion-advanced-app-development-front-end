import type { Article } from '../typings/Article';

import axios from 'axios';
import { BASE_URL } from '../../config';

const getArticles = async (category?: string): Promise<Article[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/articles${category ? `?category=${category}` : ''}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getArticle = async (articleID: string): Promise<Article | undefined> => {
  try {
    const response = await axios.get(`${BASE_URL}/articles/${articleID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const ArticleController = {
  getArticles,
  getArticle,
};

export default ArticleController;
