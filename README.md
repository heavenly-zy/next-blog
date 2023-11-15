<div align="center">

<h1 align="center">My Next Blog</h1>

我的个人博客，它使用 Next.js、React、TypeScript、TypeORM 和 TailwindCSS 构建。

访问地址：http://182.92.201.130/

</div>

## 启动数据库

```sh
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

如果是在生产环境:
- 注意 `"$PWD/blog-data"` 需要改为绝对路径 `/home/blog/blog-data/`
- 需要通过 `--name` 设置数据库名称

```sh
docker run --name pg-database -v /home/blog/blog-data/:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
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

# 创建生产环境数据库
CREATE DATABASE blog_production ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 创建数据表

```sh
# 升级
pnpm migration:run

# 降级
pnpm migration:revert
```

## 数据填充

注意：一般仅在开发环境运行 seed 脚本

```sh
pnpm seed
```

## 开发

```sh
pnpm install
pnpm dev
```

## 部署

```sh
git push
pnpm deploy:prod
```

## 代码检查

```bash
# 使用 prettier
pnpm lint:prettier
```

## Git 提交规范参考

- `feat` 增加新的业务功能
- `fix` 修复业务问题/BUG
- `perf` 优化性能
- `style` 更改代码风格, 不影响运行结果
- `refactor` 重构代码
- `revert` 撤销更改
- `test` 测试相关, 不涉及业务代码的更改
- `docs` 文档和注释相关
- `chore` 更新依赖/修改脚手架配置等琐事
- `workflow` 工作流改进
- `ci` 持续集成相关
- `types` 类型定义文件更改
- `wip` 开发中