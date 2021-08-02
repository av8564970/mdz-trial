import { createContext } from 'react';

import { PostDto } from '../types/entities';


export type ServerSideProps = Partial<{
  // region posts#index
  alert: string;
  posts: PostDto[];
  // endregion
  // region posts#edit
  post: PostDto;
  // endregion
}>;


const context = createContext<ServerSideProps>({});

export default context;
