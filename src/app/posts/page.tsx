"use client"

import { Post } from "@/entity/Post"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

type Data = {
  list: Post[]
  total: number
  page: number
  size: number
}

const PostsIndex = () => {
  const [data, setData] = useState<Data>({
    list: [],
    total: 0,
    page: 0,
    size: 0
  })
  useEffect(() => {
    axios
      .get<Data>(`/api/v1/posts?page=${data.page}&size=${data.size}`, {
        headers: { "Cache-Control": "no-store" }
      })
      .then((res) => {
        setData(res.data)
      })
  }, [])
  return (
    <div>
      <h1>文章列表</h1>
      {data.list.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}>{p.title}</Link>
        </div>
      ))}
      <hr />
      <footer>
        共 {data.total} 篇文章，当前是第 {data.page} 页
        <Link href={`?page=${data.page - 1}`}>
          上一页
        </Link>
        |
        <Link href={`?page=${data.page + 1}`}>
          下一页
        </Link>
      </footer>
    </div>
  )
}

export default PostsIndex
