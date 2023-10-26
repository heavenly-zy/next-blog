import crypto from "crypto"

export const hashPassword = (password: string) => {
  const hash = crypto.createHash("sha256")
  return hash.update(password).digest("hex")
}
