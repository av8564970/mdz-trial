import React, { FC, useCallback } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import { IPost } from '../../types/entities';

import './Post.scss';


interface PostProps {
  post: IPost;
  onDelete: (post: IPost) => Promise<void>;
  className?: string;
}

const Post: FC<PostProps> = (props) => {
  const {
    post,
    onDelete,
    className,
  } = props;


  const handleDeleteButtonClick = useCallback(async () => {
    await onDelete(post);
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
      className={clsx('post', className)}
      extra={actionsJsx}
    >
      TBD
    </Card>
  );
};

export default Post;
