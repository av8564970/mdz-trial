import { ComponentsResponse, PostResponse, PostsResponse } from '../types/entities';


export default class Api {
  private static BASE_URL = '/api';


  // region posts

  static async getPosts(): Promise<PostsResponse> {
    const response = await fetch(`${Api.BASE_URL}/posts`);

    return await response.json() as unknown as PostsResponse;
  }

  static async getPost(id: number): Promise<PostResponse> {
    const response = await fetch(`${Api.BASE_URL}/posts/${id}`);

    return await response.json() as unknown as PostResponse;
  }

  static async deletePost(id: number): Promise<void> {
    await fetch(`${Api.BASE_URL}/posts/${id}`, { method: 'DELETE' });
  }

  // endregion

  // region components

  static async getComponents(postId?: number): Promise<ComponentsResponse> {
    const response = await fetch(`${Api.BASE_URL}/components${postId ? `?post_id=${postId}` : ''}`);

    return await response.json() as unknown as ComponentsResponse;
  }

  // endregion
}
