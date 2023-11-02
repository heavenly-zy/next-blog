"use client"

import { Post } from "@/entity/Post"
import { usePager } from "@/hooks/usePager"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

type Data = {
  list: Post[]
  total: number
  page: number
}

const PostsIndex = ({ searchParams }: { searchParams: { page: number } }) => {
  const [data, setData] = useState<Data>({
    list: [],
    total: 0,
    page: 0
  })
  useEffect(() => {
    axios
      .get<Data>(`/api/v1/posts?page=${searchParams?.page || 1}`, {
        headers: { "Cache-Control": "no-store" }
      })
      .then((res) => {
        setData(res.data)
      })
  }, [searchParams?.page])
  const { pager } = usePager({ page: data.page, total: data.total })
  return (
    <div>
      <h1>文章列表</h1>
      {data.list.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}>{p.title}</Link>
        </div>
      ))}
      <hr />
      <footer>{pager}</footer>
    </div>
  )
}

export default PostsIndex
