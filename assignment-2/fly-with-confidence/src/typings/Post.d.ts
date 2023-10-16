import type { Comment } from './Comment';

export interface Post {
  postID: string,
  user: string,
  date: string,
  title: string,
  content: string,
  categories: string[],
  likes: number,
  dislikes: number,
  image?: string,
  location?: string
}

export interface SimplePost {
  date: string,
  postID: string,
  title: string,
  content: string,
  categories: string[],
  likes: number,
  dislikes: number,
  commentCount: number,
  image?: string
}

export interface BasicPost {
  title: string,
  content: string,
  categories: string[],
  image?: string,
  location?: string,
  date: string
}

export interface PostDetail {
  postID: string,
  user: string,
  date: string,
  title: string,
  content: string,
  categories: string[],
  likes: number,
  dislikes: number,
  comments: Comment[],
  image?: string,
  location?: string
}