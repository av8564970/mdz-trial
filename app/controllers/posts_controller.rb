class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def create
    Post.create
    redirect_to posts_path
  end

  def edit
    render plain: 'Not implemented yet.', :status => :not_implemented
  end
end
