"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = void 0;
require("reflect-metadata");
var _typeorm = require("typeorm");
var database = process.env.NODE_ENV === "production" ? "blog_production" : "blog_development";
var AppDataSource = new _typeorm.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database: database,
  synchronize: false,
  logging: false,
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: []
});
exports.AppDataSource = AppDataSource;