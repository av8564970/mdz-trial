FROM debian:10
# Base system
RUN \
  apt-get update && \
  apt-get install -y build-essential ruby-dev nodejs npm sqlite3 libsqlite3-dev && \
  gem install globalid:0.4.2 rails:6.1.4 bundler:2.2.24 && \
  npm i -g yarn
# App
WORKDIR /app
COPY . .
RUN \
  bundle install && \
  rails db:setup && \
  rails assets:precompile
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
