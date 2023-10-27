import { createResponse, getSession } from "@/lib/session"
import { SignIn } from "@/model/SignIn"
import { type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  const response = new Response()
  const session = await getSession(req, response)
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
    session.user = signIn.user
    await session.save()
    return createResponse(response, JSON.stringify(signIn.user))
  }
}
