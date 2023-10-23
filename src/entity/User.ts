import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from "typeorm"
import { Post } from "./Post"
import { Comment } from "./Comment"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number
  @Column("varchar")
  username: string
  @Column("varchar")
  passwordDigest: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @OneToMany((type) => Post, (post) => post.author)
  posts: Relation<Post>[]
  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Relation<Comment>[]
}
