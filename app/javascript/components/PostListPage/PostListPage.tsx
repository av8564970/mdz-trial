import React, { FC } from 'react';

import Api from '../../api/Api';
import usePosts from '../../hooks/usePosts';
import { IPost } from '../../types/entities';
import PageLayout from '../PageLayout/PageLayout';
import Post from '../Post/Post';

import './PostListPage.scss';


const PostListPage: FC = () => {
  const [ posts, setPosts ] = usePosts();


  async function handlePostDelete(target: IPost): Promise<void> {
    await Api.deletePost(target);
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== target.id));
  }


  if (!posts) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <PageLayout title="Posts" className="post-list-page">
      <div className="post-list">
        {posts.length ?
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDelete={handlePostDelete}
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
    </PageLayout>
  );
};

export default PostListPage;
