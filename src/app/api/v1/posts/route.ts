import { Post } from "@/entity/Post"
import { getDatabaseConnection } from "@/lib/getDatabaseConnection"
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