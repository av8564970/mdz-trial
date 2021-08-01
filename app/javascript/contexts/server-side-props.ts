import { createContext } from 'react';

import { IPost } from '../types/entities';


export type ServerSideProps = Partial<{
  // region posts#index
  posts: IPost[];
  // endregion
  // region posts#edit
  post: IPost;
  // endregion
}>;


const context = createContext<ServerSideProps>({});

export default context;
