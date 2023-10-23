import { Post } from "@/entity/Post"
import { getDatabaseConnection } from "@/lib/getDatabaseConnection"

export default async function Home() {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  console.log("posts: ", posts)
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
