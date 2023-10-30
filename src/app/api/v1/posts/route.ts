import { Post } from "@/entity/Post"
import { getDatabaseConnection } from "@/lib/get-database-connection"
import { getQueryParams } from "@/lib/get-query-params"
import { getSession } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { title, content } = await req.json()
  const session = await getSession(req, new Response())
  const post  = new Post()
  post.title = title
  post.content = content
  if (session?.user) {
    post.author = session.user
    const connection = await getDatabaseConnection()
    await connection.manager.save(post)
    return NextResponse.json(post)
  } else {
    return new Response("用户认证失败，请重新登录", {
      status: 401
    })
  }
}

export async function GET(req: NextRequest) {
  const page = +(getQueryParams(req.nextUrl.search)?.page || 1)
  const size = +(getQueryParams(req.nextUrl.search)?.size || 3)
  const session = await getSession(req, new Response())
  if (session?.user) {
    const connection = await getDatabaseConnection()
    const [posts, count] = await connection.manager.findAndCount(Post, {
      skip: (page - 1) * size, take: size
    })
    return NextResponse.json({
      list: posts,
      total: count,
      page,
      size
    })
  } else {
    return new Response("用户认证失败，请重新登录", {
      status: 401
    })
  }
}
