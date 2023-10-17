import type { Article } from '../typings/Article';

import axios from 'axios';
import { BASE_URL } from '../../config';

const getArticles = async (category?: string): Promise<Article[]> => {
  try {
    const response = category ?
        await axios.get(`${BASE_URL}/articles?category=${category}`) :
        await axios.get(`${BASE_URL}/articles`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

const ArticleController = {
  getArticles,
};

export default ArticleController;
