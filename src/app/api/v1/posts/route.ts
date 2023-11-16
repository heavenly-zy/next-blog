import { Post } from "@/entity/Post"
import { getDatabaseConnection } from "@/lib/get-database-connection"
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
  const searchParams = Object.fromEntries(new URL(req.url).searchParams)
  const page = +(searchParams?.page || 1)
  const pageSize = 4
  const session = await getSession(req, new Response())
  const connection = await getDatabaseConnection()
  const [posts, count] = await connection.manager.findAndCount(Post, {
    where: { author: { id: session.user?.id } },
    skip: (page - 1) * pageSize, take: pageSize
  })
  return NextResponse.json({
    list: posts,
    pageCount: Math.ceil(count / pageSize),
    page,
    currentUser: session.user
  })
}
