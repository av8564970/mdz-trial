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

  const {
    post,
    error,
  } = usePost(Number(id));


  return (
    <PageLayout title={`Post #${id}`} className="post-edit-page">
      {error ?
        (
          <div className="post-edit-page__error">{error}</div>
        ) :
        post ?
          (
            <>
              <Form className="post-edit-page__form">
                TBD
              </Form>
              <div className="post-edit-page__actions">
                <Link to="/posts">← Back to Posts</Link>
              </div>
            </>
          ) :
          (
            <div className="post-edit-page__loading">Loading...</div>
          )}
    </PageLayout>
  );
};

export default PostEditPage;
