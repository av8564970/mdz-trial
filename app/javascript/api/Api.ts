import { IPost } from '../types/entities';


export default class Api {
  private static BASE_URL = '/api';


  static async deletePost(post: IPost) {
    return fetch(`${Api.BASE_URL}/posts/${post.id}`, { method: 'DELETE' });
  }
}
