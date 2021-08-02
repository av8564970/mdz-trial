import React, { FC } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Api from '../../api/Api';
import usePost from '../../hooks/usePost';
import usePostComponents from '../../hooks/usePostComponents';
import PageLayout from '../PageLayout/PageLayout';
import PostForm, { PostFormValues } from '../PostForm/PostForm';

import './PostEditPage.scss';


interface RouteParams {
  id: string;
}

const PostEditPage: FC = () => {
  const { id } = useParams<RouteParams>();

  const {
    post,
    error,
    subscription,
  } = usePost(Number(id), true);

  const {
    components,
    error: postComponentsError,
  } = usePostComponents(post?.id);


  async function handleFormSubmit(values: PostFormValues): Promise<void> {
    const { components: newComponents } = values;
    const newComponentIds = newComponents.map((component) => component.id);
    const promises: Promise<unknown>[] = [];
    // delete
    components.forEach((component) => {
      const { id: componentId } = component;
      if (!newComponentIds.includes(componentId)) {
        promises.push(Api.deleteComponent(componentId));
      }
    });
    // create and update
    newComponents.forEach((component) => {
      const { id: componentId } = component;
      if (!componentId) {
        promises.push(Api.createComponent(post!.id, component));
      } else {
        promises.push(
          Api.updateComponent(
            componentId,
            {
              ...component,
              post_id: post!.id,
            },
          ),
        );
      }
    });
    //
    await Promise.all(promises);
    subscription.perform('update', { id: post!.id });
  }


  return (
    <PageLayout title={`Post #${id}`} className="post-edit-page">
      {error ?
        (
          <div className="post-edit-page__error">{error}</div>
        ) :
        post ?
          (
            <>
              {postComponentsError ?
                (
                  <div className="post-edit-page__post-components-error">{postComponentsError}</div>
                ) :
                components ?
                  (
                    <PostForm
                      components={components}
                      onSubmit={handleFormSubmit}
                      className="post-edit-page__form"
                    />
                  ) :
                  (
                    <div className="post-edit-page__post-components-loading">Loading...</div>
                  )}
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
