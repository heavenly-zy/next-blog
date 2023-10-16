import { getPosts } from "@/lib/posts"
import Link from "next/link"

const PostsIndex = async () => {
  const posts = await getPosts()
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}>{p.id}</Link>
        </div>
      ))}
    </div>
  )
}

export default PostsIndex
