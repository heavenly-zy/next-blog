import "reflect-metadata"
import { Post } from "@/entity/Post"
import { User } from "@/entity/User"
import { Comment } from "@/entity/Comment"
import { AppDataSource } from "@/data-source"
import { DataSource } from "typeorm"

export const getDatabaseConnection = async () => {
  return new DataSource({
    ...AppDataSource.options,
    entities: [Post, User, Comment]
  }).initialize()
}