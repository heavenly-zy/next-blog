import { Post } from "@/entity/Post"
import { getDatabaseConnection } from "@/lib/get-database-connection"
import { getSession } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { title, content } = await req.json()
  const session = await getSession(req, new Response())
  if (session?.user) {
    const connection = await getDatabaseConnection()
    const post = await connection.manager.findOne(Post, {
      where: { id: +params.id }
    })
    if (!post) return NextResponse.json("post 不存在", { status: 422 })
    post.title = title
    post.content = content
    await connection.manager.save(post)
    return NextResponse.json("修改成功")
  } else {
    return new Response("用户认证失败，请重新登录", {
      status: 401
    })
  }
}
