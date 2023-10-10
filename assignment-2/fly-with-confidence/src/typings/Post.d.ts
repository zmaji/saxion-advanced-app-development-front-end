export interface Post {
  postID: string,
  user: string,
  title: string,
  content: string,
  categories: string[],
  likes: number,
  dislikes: number,
  image: string
}