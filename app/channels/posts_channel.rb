class PostsChannel < ApplicationCable::Channel
  def subscribed
    stream_for :activity
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
