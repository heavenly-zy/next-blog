import { AppDataSource } from "./data-source"
import { Comment } from "./entity/Comment"
import { Post } from "./entity/Post"
import { User } from "./entity/User"

AppDataSource.initialize()
  .then(async (connection) => {
    // 创建 user1
    const u1 = new User()
    u1.username = "ClariS"
    u1.passwordDigest = "123456"
    await connection.manager.save(u1)
    console.log("users 数据填充了")

    // 创建 post1
    const p1 = new Post()
    p1.title = "Post 1"
    p1.content = "My First Post"
    p1.author = u1
    await connection.manager.save(p1)
    console.log("posts 数据填充了")

    // 创建 comment1
    const c1 = new Comment()
    c1.user = u1
    c1.post = p1
    c1.content = "xxx"
    await connection.manager.save(c1)
    console.log("comments 数据填充了")

    connection.isInitialized && await connection.destroy()
  })
  .catch((error) => console.log(error))
