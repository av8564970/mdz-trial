interface Id {
  id: number;
}

interface Timestamps {
  created_at: string;
  updated_at: string;
}

interface Dto extends Id, Timestamps {}

export interface PostDto extends Dto {
  is_dependent: boolean;
}

export enum ComponentType {
  'string' = 'string',
  'boolean' = 'boolean',
  'relation' = 'relation',
}

export interface ComponentPayload<T = unknown> {
  label: string;
  value: T;
}

export interface ComponentDto<T = unknown> extends Dto {
  post_id: number | null;
  component_type: ComponentType;
  payload: ComponentPayload<T>;
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
