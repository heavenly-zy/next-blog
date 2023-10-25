import { getDatabaseConnection } from "@/lib/getDatabaseConnection"
import { User } from "@/entity/User"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const { username, password, passwordConfirmation } = await req.json()
  const user = new User()
  Object.assign(user, {
    username: username.trim(),
    password,
    passwordConfirmation
  })
  user.validate()
  if (user.hasErrors) {
    return new Response(JSON.stringify(user.errors), {
      // http code 422: 用户以正确的格式发送了请求，但请求中包含了语义上错误或不完整的信息
      status: 422,
      headers: new Headers({
        "Content-Type": "application/json; charset=utf-8"
      })
    })
  } else {
    const connection = await getDatabaseConnection()
    await connection.manager.save(user)
    return NextResponse.json(user)
  }
}
