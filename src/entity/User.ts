import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm"
import { Post } from "./Post"
import { Comment } from "./Comment"
import { getDatabaseConnection } from "@/lib/get-database-connection"
import { hashPassword } from "@/lib/hash-password"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id!: number
  @Column("varchar")
  username!: string
  @Column("varchar")
  passwordDigest?: string
  @CreateDateColumn()
  createdAt!: Date
  @UpdateDateColumn()
  updatedAt!: Date
  @OneToMany((type) => Post, (post) => post.author)
  posts!: Relation<Post>[]
  @OneToMany((type) => Comment, (comment) => comment.user)
  comments!: Relation<Comment>[]
  password!: string
  passwordConfirmation?: string
  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[]
  }
  async validate() {
    const connection = await getDatabaseConnection()
    const user = await connection.manager.findOne(User, { where: { username: this.username } })
    
    if (this.username?.trim() === "") {
      this.errors.username.push("不能为空")
    }
    if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
      this.errors.username.push("格式不合法")
    }
    if (this.username.trim().length > 42) {
      this.errors.username.push("太长")
    }
    if (this.username.trim().length <= 3) {
      this.errors.username.push("太短")
    }
    if (user) {
      this.errors.username.push("用户已存在，不能重复注册")
    }
    if (this.password === "") {
      this.errors.password.push("不能为空")
    }
    if (this.password !== this.passwordConfirmation) {
      this.errors.passwordConfirmation.push("密码不匹配")
    }
  }
  get hasErrors() {
    return Object.values(this.errors).some((v) => v.length > 0)
  }
  @BeforeInsert()
  generatePasswordDigest() {
    // 用 @BeforeInsert() 装饰器定义的方法，会在 save(user) 时自动执行（即：在保存信息到数据库之前执行）
    this.passwordDigest = hashPassword(this.password)
  }
  toJSON() {
    // 当对象被序列化（JSON.stringify()）时，toJSON 方法会自动被调用
    // 文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_%E6%96%B9%E6%B3%95
    return {
      ...this,
      password: undefined,
      passwordConfirmation: undefined,
      passwordDigest: undefined,
      errors: undefined
    }
  }
}
