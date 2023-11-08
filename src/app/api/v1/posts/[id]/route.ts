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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession(req, new Response())
  if (session?.user) {
    const connection = await getDatabaseConnection()
    const result = await connection.manager.delete(Post, +params.id)
    if (result.affected && result.affected > 0) {
      return NextResponse.json("删除成功")
    } else {
      return NextResponse.json("删除失败，没有找到匹配的数据", { status: 400 })
    }
  } else {
    return new Response("用户认证失败，请重新登录", {
      status: 401
    })
  }
}
