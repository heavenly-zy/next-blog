import { User } from "@/entity/User"
import { getIronSession, createResponse, IronSessionOptions } from "iron-session"
import { cookies, headers } from "next/headers"

interface Data {
  user?: User
}

const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET!,
  cookieName: "blog",
  cookieOptions: {
    secure: false
  }
}

export const getSession = (req: Request, res: Response) => {
  const session = getIronSession<Data>(req, res, sessionOptions)
  return session
}

// React Server Component 中获取 session
export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers()),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    )
  }
  const res = {
    getHeader: headers().get,
    setCookie: cookies().set,
    setHeader: headers().set
  }
  const session = getSession(req as unknown as Request, res as unknown as Response)
  return session
}

export { createResponse }
