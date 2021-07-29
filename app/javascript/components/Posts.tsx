import React, { FC, useState } from 'react';
import { Layout } from 'antd';

import Api from '../api/Api';
import { IPost } from '../types/entities';
import Post from './Post';

import 'antd/dist/antd.css';
import './Posts.scss';


const {
  Header,
  Content,
} = Layout;


interface PostsProps {
  posts: IPost[];
}

const Posts: FC<PostsProps> = (props) => {
  const { posts } = props;


  const [ effectivePosts, setEffectivePosts ] = useState(posts);


  async function handlePostDelete(target: IPost): Promise<void> {
    await Api.deletePost(target);
    setEffectivePosts((effectivePosts) => effectivePosts.filter((post) => post.id !== target.id));
  }


  return (
    <Layout className="layout">
      <Header />
      <Content className="layout__content">
        <div className="layout__title">Posts</div>
        <div className="post-list">
          {effectivePosts.length ?
            effectivePosts.map((post) => (
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
        <div className="post-list-actions">
          <a href="/posts/create">Create a post</a>
        </div>
      </Content>
    </Layout>
  );
};

export default Posts;
