import { IPost } from '../types/entities';


export default class Api {
  private static BASE_URL = '/api';


  static async getPosts(): Promise<IPost[]> {
    const response = await fetch(`${Api.BASE_URL}/posts`);

    return await response.json() as unknown as IPost[];
  }

  static async getPost(id: number): Promise<IPost> {
    const response = await fetch(`${Api.BASE_URL}/posts/${id}`);

    return await response.json() as unknown as IPost;
  }

  static async deletePost(post: IPost): Promise<void> {
    await fetch(`${Api.BASE_URL}/posts/${post.id}`, { method: 'DELETE' });
  }
}
