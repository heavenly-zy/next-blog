import { Post } from "@/entity/Post"
import { getDatabaseConnection } from "@/lib/getDatabaseConnection"
import Link from "next/link"

export default async function Home() {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  console.log("posts: ", posts)
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </div>
  )
}
