"use client"

import { Post } from "@/entity/Post"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

const PostsIndex = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    axios
      .get<Post[]>("/api/v1/posts", {
        headers: { "Cache-Control": "no-store" }
      })
      .then((res) => {
        setPosts(res.data)
      })
  }, [])
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}>{p.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default PostsIndex
