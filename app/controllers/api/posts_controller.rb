class Api::PostsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :find_post, only: %w(show update destroy)

  def index
    render json: { result: Post.all }
  end

  def create
    post_params = params[:post].permit(:is_dependent)
    post = Post.create(post_params)
    if post.persisted?
      PostsChannel.broadcast_to(:activity, { type: 'created', payload: post })
      render json: { result: post }, status: :created
    else
      render json: { error: compile_error(post.errors) }, status: :bad_request
    end
  end

  def show
    render json: { result: @post }
  end

  def update
    render json: { error: 'Not implemented yet' }, status: :not_implemented
  end

  def destroy
    if @post.destroy
      PostsChannel.broadcast_to(:activity, { type: 'deleted', payload: @post })
      render json: {}
    else
      render json: { error: compile_error(@post.errors) }, status: :bad_request
    end
  end

  private

  def find_post
    @post = Post.where({ id: params[:id] }).first
    unless @post
      render json: { error: 'Post not found' }, status: :not_found
    end
  end
end
