import "reflect-metadata"
import { DataSource } from "typeorm"

const database = process.env.NODE_ENV === "production" ? "blog_production" : "blog_development"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database,
  synchronize: false,
  logging: false,
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: [],
})
