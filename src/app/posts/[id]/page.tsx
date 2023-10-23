import { Post } from "@/entity/Post"
import { getDatabaseConnection } from "@/lib/getDatabaseConnection"
import { NextPage } from "next"

type Props = {
  params: { id: string }
}
const postsShow: NextPage<Props> = async (props) => {
  const id = props.params.id
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, {
    where: { id: +id }
  })
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post.content}}></article>
    </div>
  )
}

export default postsShow
