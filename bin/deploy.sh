#!/bin/bash

set -e
set -u

# 设置 PATH
export PATH=/home/blog/.nvm/versions/node/v18.17.0/bin:$PATH

# 检查必需的命令是否存在
commands=("docker" "git" "pnpm")
for cmd in "${commands[@]}"; do
  if ! command -v $cmd &> /dev/null; then
    echo "$cmd 命令未找到，请确保它已经安装并添加到 PATH 中。"
    exit 1
  fi
done

# 参数化
APP_NAME="next-blog"
DB_NAME="pg-database"
NGINX_NAME="nginx1"

function title {
  echo 
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################" 
  echo 
}

# 清理容器
cleanup() {
  title "清理资源"
  docker stop $APP_NAME-app || true
  docker rm $APP_NAME-app || true
}

# 当脚本中的命令失败时执行 cleanup 函数
trap cleanup ERR

title '开始';

cd /home/blog/app/ &&

title '启动数据库'
docker start $DB_NAME &&

title '拉取最新代码'
git pull &&

# 生产环境下默认不会安装 devDependencies，需要启用 --production=false 选项
title '安装依赖'
pnpm install --production=false &&

title '应用 git 补丁并 migrate'
git apply migrate.patch;
rm -rf dist/ &&
pnpm compile &&
pnpm migration:run &&

title '构建镜像'
git reset --hard HEAD &&
docker build -t $APP_NAME/node-web-app . &&

title '运行镜像'
docker kill $APP_NAME-app || true
docker rm $APP_NAME-app || true
docker run --name $APP_NAME-app --network=host -p 3000:3000 -d $APP_NAME/node-web-app &&

title '启动nginx'
docker kill $NGINX_NAME || true
docker rm $NGINX_NAME || true
docker run --name $NGINX_NAME --network=host -v /home/blog/app/nginx.conf:/etc/nginx/conf.d/default.conf -v /home/blog/app/.next/static/:/usr/share/nginx/html/_next/static/ -d nginx:1.25.3

title '完成！';