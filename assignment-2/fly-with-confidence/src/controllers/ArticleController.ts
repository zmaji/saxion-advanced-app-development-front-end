import type { Article } from '../typings/Article';

import axios from 'axios';
import { BASE_URL } from '../../config';
import ArticleModel from '../model/ArticleModel';
import { isOnline } from '../utils/NetworkDetection';
import { addImage } from '../utils/ImageCacher';

const getArticles = async (category?: string): Promise<Article[]> => {
  try {
    if (await isOnline()) {
      try {
        const response = await axios.get(`${BASE_URL}/articles${category ? `?category=${category}` : ''}`, {
          timeout: 2000,
        });
        // const response = await axios.get(`${BASE_URL}/articles${category ? `?category=${category}` : ''}`);
        const articles = response.data;

        await ArticleModel.createTable();

        for (const article of articles) {
          await ArticleModel.insertArticle(article);
          await addImage(article.image);
        }

        return articles;
      } catch (error) {
        console.info('Error fetching articles from the API:', error);
        console.info('Fetching articles from local DB', error);

        return await ArticleModel.getArticles(category);
      }
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
      try {
        const response = await axios.get(`${BASE_URL}/articles/${articleID}`, {
          timeout: 2000,
        });

        return response.data;
      } catch (error) {
        console.info('Error fetching article from the API:', error);
        console.info('Fetching article from local DB', error);

        const article: Article| null = await ArticleModel.getArticle(articleID);

        return article ? article : undefined;
      }
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
