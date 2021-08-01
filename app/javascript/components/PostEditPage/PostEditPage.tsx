import React, { FC } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Form } from 'antd';

import usePost from '../../hooks/usePost';
import PageLayout from '../PageLayout/PageLayout';

import './PostEditPage.scss';


interface RouteParams {
  id: string;
}

const PostEditPage: FC = () => {
  const { id } = useParams<RouteParams>();

  const [ post ] = usePost(Number(id));


  if (!post) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <PageLayout title={`Post #${post.id}`} className="post-edit-page">
      <Form className="post-edit-page__form">
        TBD
      </Form>
      <div className="post-edit-page__actions">
        <Link to="/posts">&larr; Back to Posts</Link>
      </div>
    </PageLayout>
  );
};

export default PostEditPage;
