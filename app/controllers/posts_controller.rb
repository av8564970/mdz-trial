class PostsController < ApplicationController
  def index
    posts = Post.all
    @spa_props = { posts: posts }
    render 'spa'
  end

  def create
    Post.create
    redirect_to posts_path
  end

  def edit
    post = Post.where({ id: params[:id] }).first
    @spa_props = { post: post }
    render 'spa'
  end
end
