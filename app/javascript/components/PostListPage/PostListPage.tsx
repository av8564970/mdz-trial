import React, { FC } from 'react';

import Api from '../../api/Api';
import usePosts from '../../hooks/usePosts';
import PageLayout from '../PageLayout/PageLayout';
import Post from '../Post/Post';

import './PostListPage.scss';


const PostListPage: FC = () => {
  const {
    posts,
    setPosts,
    error,
  } = usePosts();


  async function handlePostDelete(id: number): Promise<void> {
    await Api.deletePost(id);
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
  }


  return (
    <PageLayout title="Posts" className="post-list-page">
      {error ?
        (
          <div className="post-list-page__error">{error}</div>
        ) :
        posts ?
          (
            <>
              <div className="post-list">
                {posts.length ?
                  posts.map((post) => (
                    <Post
                      key={post.id}
                      post={post}
                      onDelete={handlePostDelete}
                      chain={[ post.id ]}
                      className="post-list__item"
                    />
                  )) :
                  (
                    <div className="post-list__empty-placeholder">
                      No posts were found.
                    </div>
                  )}
              </div>
              <div className="post-list-page__actions">
                <a href="/posts/create">Create new Post</a>
              </div>
            </>
          ) :
          (
            <div className="post-list-page__loading">Loading...</div>
          )}
    </PageLayout>
  );
};

export default PostListPage;
