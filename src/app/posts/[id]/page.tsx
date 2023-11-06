import { Post } from "@/entity/Post"
import { getDatabaseConnection } from "@/lib/get-database-connection"
import { marked } from "marked"
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
    post && (
      <div>
        <h1 className="w-[890px] mx-auto">{post.title}</h1>
        <article className="markdown-body" dangerouslySetInnerHTML={{ __html: marked(post.content) }}></article>
      </div>
    )
  )
}

export default postsShow
