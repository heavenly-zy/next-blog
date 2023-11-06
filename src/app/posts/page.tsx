"use client"

import { Post } from "@/entity/Post"
import { usePager } from "@/hooks/usePager"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

type Data = {
  list: Post[]
  pageCount: number
  page: number
}

const PostsIndex = ({ searchParams }: { searchParams: { page: number } }) => {
  const [data, setData] = useState<Data>({
    list: [],
    pageCount: 0,
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
  const { pager } = usePager({ page: data.page, pageCount: data.pageCount })
  return (
    <>
      <div className="posts">
        <h1>文章列表</h1>
        {data.list.map((p) => (
          <div key={p.id} className="post">
            <Link className="text-[#000] hover:text-primary no-underline" href={`/posts/${p.id}`}>
              {p.title}
            </Link>
          </div>
        ))}
        <footer>{pager}</footer>
      </div>
      <style jsx>{`
        .posts {
          max-width: 800px;
          margin: 0 auto;
          padding: 16px;
        }
        .post {
          border-bottom: 1px solid #ddd;
          padding: 8px 0;
        }
      `}</style>
    </>
  )
}

export default PostsIndex
