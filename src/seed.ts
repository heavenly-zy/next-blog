import { AppDataSource } from "./data-source"
import { Post } from "./entity/Post"

AppDataSource.initialize()
  .then(async (connection) => {
    const posts = await connection.manager.find(Post)
    if (posts.length === 0) {
      await connection.manager.save(
        Array.from(new Array(40), (_, index) => {
          return new Post({ title: `Post ${index + 1}`, content: `这是我的第${index + 1}篇文章` })
        })
      )
      console.log("posts 数据填充了")
    }
    if (connection.isInitialized) {
      await connection.destroy()
    }
  })
  .catch((error) => console.log(error))
