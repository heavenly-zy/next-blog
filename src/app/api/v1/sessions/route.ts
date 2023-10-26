import { SignIn } from "@/model/SignIn"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  const signIn = new SignIn(username, password)
  await signIn.validate()
  if (signIn.hasErrors) {
    return new Response(JSON.stringify(signIn.errors), {
      status: 422,
      headers: new Headers({
        "Content-Type": "application/json; charset=utf-8"
      })
    })
  } else {
    return NextResponse.json(signIn.user)
  }
}