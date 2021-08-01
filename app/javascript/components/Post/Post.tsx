import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Card } from 'antd';

import usePostComponents from '../../hooks/usePostComponents';
import { PostDto } from '../../types/entities';
import Component from '../Component/Component';

import './Post.scss';


interface PostProps {
  post: PostDto;
  onDelete: (id: number) => Promise<void>;
  chain: number[];
  className?: string;
}

const Post: FC<PostProps> = (props) => {
  const {
    post,
    onDelete,
    chain,
    className,
  } = props;


  const {
    components,
    error,
  } = usePostComponents(post.id);


  const handleDeleteButtonClick = useCallback(async () => {
    await onDelete(post.id);
  }, [ post ]);


  const actionsJsx = (
    <div className="post__actions">
      <Link to={`/posts/${post.id}`} className="post__action">Edit</Link>
      <button onClick={handleDeleteButtonClick} className="link post__action">
        Delete
      </button>
    </div>
  );

  return (
    <Card
      title={`Post #${post.id}`}
      className={clsx(
        'post', {
          'post_dependent': post.is_dependent && 1 === chain.length,
        },
        className,
      )}
      extra={actionsJsx}
    >
      {error ?
        (
          <div className="post__error">{error}</div>
        ) :
        components ?
          (
            <div className="post__components">
              {components.map((component) => (
                <Component
                  key={component.id}
                  component={component}
                  postChain={chain}
                  className="post__component"
                />
              ))}
            </div>
          ) :
          (
            <div className="post__loading">Loading...</div>
          )}
    </Card>
  );
};

export default Post;
