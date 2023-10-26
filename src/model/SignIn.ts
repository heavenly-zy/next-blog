import { User } from "@/entity/User"
import { getDatabaseConnection } from "@/lib/getDatabaseConnection"

export class SignIn {
  user!: User
  errors = { username: [] as string[], password: [] as string[] }

  constructor(
    public username: string,
    public password: string
  ) {}

  async validate() {
    if (this.username.trim() === "") {
      this.errors.username.push("请填写用户名")
      return
    }
    const connection = await getDatabaseConnection()
    const user = await connection.manager.findOne(User, { where: { username: this.username } })
    if (user) {
      if (user.passwordDigest === this.password + "_digest") {
        this.user = user
      } else {
        this.errors.password.push("用户名与密码不匹配")
      }
    } else {
      this.errors.username.push("用户名不存在")
    }
  }

  get hasErrors() {
    return Object.values(this.errors).some((v) => v.length > 0)
  }
}
