import React, { FC } from 'react';
import clsx from 'clsx';

import usePost from '../../hooks/usePost';

import './ComponentPost.scss';
import Post from '../Post/Post';


interface ComponentPostProps {
  id: number;
  onDelete: (id: number) => Promise<void>;
  chain: number[];
  className?: string;
}

const ComponentPost: FC<ComponentPostProps> = (props) => {
  const {
    id,
    onDelete,
    chain,
    className,
  } = props;


  const {
    post,
    error,
  } = usePost(id);


  return (
    <div className={clsx('component-post', className)}>
      {error ?
        (
          <div className="component-post__error">{error}</div>
        ) :
        post ?
          (
            <Post
              post={post}
              onDelete={onDelete}
              chain={chain}
              className="component-post__post"
            />
          ) :
          (
            <div className="component-post__loading">Loading...</div>
          )}
    </div>
  );
};

export default ComponentPost;
