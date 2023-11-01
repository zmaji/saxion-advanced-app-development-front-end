import type { Article } from '../typings/Article';

import axios from 'axios';
import { BASE_URL } from '../../config';
import ArticleModel from '../model/ArticleModel';
import { isOnline } from '../utils/NetworkDetection';

const getArticles = async (category?: string): Promise<Article[]> => {
  try {
    if (await isOnline()) {
      const response = await axios.get(`${BASE_URL}/articles${category ? `?category=${category}` : ''}`);
      const articles = response.data;

      await ArticleModel.createTable();

      for (const article of articles) {
        await ArticleModel.insertArticle(article);
      }

      return articles;
    } else {
      return await ArticleModel.getArticles(category);
    }
  } catch (error) {
    throw error;
  }
};

const getArticle = async (articleID: string): Promise<Article | undefined> => {
  try {
    if (await isOnline()) {
      const response = await axios.get(`${BASE_URL}/articles/${articleID}`);

      return response.data;
    } else {
      const article: Article| null = await ArticleModel.getArticle(articleID);

      return article ? article : undefined;
    }
  } catch (error) {
    throw error;
  }
};

const ArticleController = {
  getArticles,
  getArticle,
};

export default ArticleController;
