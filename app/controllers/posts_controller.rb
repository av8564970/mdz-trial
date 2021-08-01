class PostsController < ApplicationController
  include PostsHelper

  def index
    posts = Post.all
    @spa_props = { posts: posts }
    render 'spa'
  end

  def create
    # comments
    comments = []
    rand(1..3).times do
      comment = Post.create
      Component.create(
        post: comment,
        component_type: 'string',
        payload: { label: 'Author', value: 'John Doe' }.to_json,
        ord: 1
      )
      Component.create(
        post: comment,
        component_type: 'string',
        payload: { label: 'Text', value: lorem(1, 8) }.to_json,
        ord: 2
      )
      comments << comment
    end
    # post
    post = Post.create
    Component.create(
      post: post,
      component_type: 'string',
      payload: { label: 'Title', value: 'Post title' }.to_json,
      ord: 1
    )
    Component.create(
      post: post,
      component_type: 'boolean',
      payload: { label: 'Published?', value: rand > 0.5 }.to_json,
      ord: 2
    )
    Component.create(
      post: post,
      component_type: 'string',
      payload: { label: 'Body', value: lorem(8, 16) }.to_json,
      ord: 3
    )
    Component.create(
      post: post,
      component_type: 'relation',
      payload: { label: 'Comments', value: comments.map { |comment| comment.id } }.to_json,
      ord: 4
    )
    #
    redirect_to posts_path
  end

  def edit
    post = Post.where({ id: params[:id] }).first
    @spa_props = { post: post }
    render 'spa'
  end
end
