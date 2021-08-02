class PostChannel < ApplicationCable::Channel
  def subscribed
    stream_for params[:id]
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def update(data)
    post = Post.find(data['id'])
    PostsChannel.broadcast_to(:activity, { type: 'updated', payload: post })
  end
end
