# My Next Blog

## 启动数据库

```sh
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

## 清空之前的开发环境

```sh
docker ps
docker kill <容器id>
docker rm <容器id>
rm -rf blog-data
```

或

```sh
docker container prune 
docker volume rm blog-data
```

## 创建数据库

```sh
# 进入 docker 容器
docker exec -it <容器id> bash

# 进入 pg 命令行
psql -U blog

# 创建开发环境数据库
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 创建数据表

```sh
# 升级数据
pnpm migration:run

# 数据填充
node dist/seed.js
```

## 开发

```sh
pnpm install
pnpm dev
```

## 部署

```sh
```