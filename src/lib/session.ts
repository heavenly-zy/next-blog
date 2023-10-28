import { User } from "@/entity/User"
import { getIronSession, createResponse } from "iron-session"

interface Data {
  user?: User
}

export const getSession = (req: Request, res: Response) => {
  const session = getIronSession<Data>(req, res, {
    password: process.env.SECRET!,
    cookieName: "blog",
    cookieOptions: {
      secure: false
    }
  })

  return session
}

export { createResponse }
