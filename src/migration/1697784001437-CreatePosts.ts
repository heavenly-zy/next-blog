import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePosts1697784001437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 升级数据库
    return await queryRunner.createTable(
      new Table({
        name: "posts",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "title", type: "varchar" },
          { name: "content", type: "text" },
          { name: "authorId", type: "int" },
          { name: "createdAt", type: "timestamp", isNullable: false, default: "now()" },
          { name: "updatedAt", type: "timestamp", isNullable: false, default: "now()" }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 降级数据库
    return await queryRunner.dropTable("posts")
  }
}
