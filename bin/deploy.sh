set -e

echo 'start';

cd /home/blog/app/ &&

# 启动数据库
docker start be64 &&

git pull &&

# 生产环境下默认不会安装 devDependencies，需要启用 --production=false 选项
pnpm install --production=false &&

# 应用 git 补丁并 migrate
git apply migrate.patch;
rm -rf dist/ &&
pnpm compile &&
pnpm migration:run &&

# 构建镜像
git reset --hard HEAD &&
pnpm build &&
docker build -t next-blog/node-web-app . &&

# 运行镜像
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d next-blog/node-web-app &&

echo 'OK!'