import type { Article } from '../typings/Article';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('fly-with-confidence.db');

const ArticleModel = {
  createTable() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
            `
          CREATE TABLE IF NOT EXISTS articles (
            articleID TEXT PRIMARY KEY,
            title TEXT,
            description TEXT,
            content TEXT,
            category TEXT,
            image TEXT
          )
        `,
            [],
            resolve,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (transaction, error) => {
              console.error('Error creating table: ', error);
              reject(error);
            },
        );
      });
    });
  },

  insertArticle(article:Article) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
            `
        INSERT OR REPLACE INTO articles (articleID, title, description, content, category, image)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
            [
              article.articleID,
              article.title,
              article.description,
              article.content,
              article.category,
              article.image,
            ],
            resolve,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (transaction, error) => {
              console.error('Error inserting article: ', error);
              reject(error);
            },
        );
      });
    });
  },

  getArticles(category?: string):Promise<Article[]> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const query = category ?
            'SELECT * FROM articles WHERE category = ?' :
            'SELECT * FROM articles';

        tx.executeSql(
            query,
            category ? [category] : [],
            (_, results) => {
              const articles: Article[] = [];

              for (let i = 0; i < results.rows.length; i++) {
                articles.push(results.rows.item(i));
              }

              resolve(articles);
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (transaction, error) => {
              console.error('Error fetching article: ', error);
              reject(error);
            },
        );
      });
    });
  },

  getArticle(articleID: string):Promise<Article | null> {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM articles WHERE articleID = ?`,
            [articleID],
            (_, results) => {
              if (results.rows.length > 0) {
                const article = results.rows.item(0);
                resolve(article);
              } else {
                resolve(null);
              }
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (transaction, error) => {
              console.error('Error fetching article: ', error);
              reject(error);
            },
        );
      });
    });
  },

  close() {
    db.closeAsync();
  },
};

export default ArticleModel;
