interface Timestamps {
  created_at: string;
  updated_at: string;
}

export interface PostDto extends Timestamps {
  id: number;
}

export interface ComponentDto<T = unknown> extends Timestamps {
  id: number;
  post_id: number | null;
  component_type: 'string' | 'boolean' | 'relation';
  payload: {
    label: string;
    value: T;
  };
  ord: number;
}

interface SuccessResponse<T> {
  result: T;
  error: never;
}

interface ErrorResponse {
  result: never;
  error: string;
}

export type PostsResponse = SuccessResponse<PostDto[]> | ErrorResponse;

export type PostResponse = SuccessResponse<PostDto> | ErrorResponse;

export type ComponentsResponse<T = unknown> = SuccessResponse<ComponentDto<T>[]> | ErrorResponse;

export type ComponentResponse<T = unknown> = SuccessResponse<ComponentDto<T>> | ErrorResponse;
