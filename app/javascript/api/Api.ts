import {
  ComponentDto,
  ComponentResponse,
  ComponentsResponse,
  PostResponse,
  PostsResponse,
} from '../types/entities';


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

  static async createComponent(
    postId: number | undefined,
    component: Pick<ComponentDto, 'component_type' | 'payload' | 'ord'>,
  ): Promise<ComponentResponse> {
    const {
      component_type,
      payload,
      ord,
    } = component;

    const response = await fetch(
      `${Api.BASE_URL}/components`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: postId,
          component_type,
          payload: JSON.stringify(payload),
          ord,
        }),
      },
    );

    return await response.json() as unknown as ComponentResponse;
  }

  static async updateComponent(
    id: number,
    value: Pick<ComponentDto, 'post_id' | 'component_type' | 'payload' | 'ord'>,
  ): Promise<ComponentResponse> {
    const {
      component_type,
      payload,
      ord,
    } = value;

    const response = await fetch(
      `${Api.BASE_URL}/components/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          component_type,
          payload: JSON.stringify(payload),
          ord,
        }),
      },
    );

    return await response.json() as unknown as ComponentResponse;
  }

  static async deleteComponent(id: number): Promise<void> {
    await fetch(`${Api.BASE_URL}/components/${id}`, { method: 'DELETE' });
  }

  // endregion
}
