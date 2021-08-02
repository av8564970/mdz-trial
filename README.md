# README

## Setup

```
ruby --version
# ruby 2.5.5p157 (2019-03-15 revision 67260) [x86_64-linux-gnu]

sqlite3 --version
# 3.27.2 2019-02-25 16:06:06 bd49a8271d650fa89e446b42e513b595a717b9212c91dd384aab871fc1d0alt1

node --version
# v14.16.1

yarn --version
# 1.22.11

rails --version
# Rails 6.1.4
```

## Run

Run the application using either of the two methods and navigate to http://0.0.0.0:3000/posts.

### Debug mode (Hot reload)

|Console 1|Console 2                 |
|---------|--------------------------|
|`rails s`|`./bin/webpack-dev-server`|

### Debug mode (Docker)

```sh
docker build -t alx-v -f Dockerfile .
docker run --rm -it -p 3000:3000 alx-v
```
