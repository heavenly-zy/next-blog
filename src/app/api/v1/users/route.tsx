import { getDatabaseConnection } from "@/lib/getDatabaseConnection"
import { User } from "@/entity/User"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const newHeaders = new Headers(req.headers)
  const { username, password, passwordConfirmation } = await req.json()
  const errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[]
  }
  if (username.trim() === "") {
    errors.username.push("不能为空")
  }
  if (!/[a-zA-Z0-9]/.test(username.trim())) {
    errors.username.push("格式不合法")
  }
  if (username.trim().length > 42) {
    errors.username.push("太长")
  }
  if (username.trim().length <= 3) {
    errors.username.push("太短")
  }
  if (password === "") {
    errors.password.push("不能为空")
  }
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation.push("密码不匹配")
  }
  const hasErrors = Object.values(errors).find((v) => v.length > 0)
  newHeaders.set("Content-Type", "application/json; charset=utf-8")
  if (hasErrors) {
    return new Response(JSON.stringify(errors), {
      status: 422,
    })
  } else {
    const connection = await getDatabaseConnection()
    const user = new User()
    user.username = username.trim()
    user.passwordDigest = password
    await connection.manager.save(user)
    return NextResponse.json(user)
  }
}