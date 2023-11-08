import { getDatabaseConnection } from "@/lib/get-database-connection"
import { EditForm } from "./EditForm"
import { Post } from "@/entity/Post"

const PostEditPage = async ({ params }: { params: { id: string } }) => {
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, {
    where: { id: +params.id }
  })
  return <>{post && <EditForm post={post} />}</>
}

export default PostEditPage
