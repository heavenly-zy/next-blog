import { Post } from "@/entity/Post"
import { getDatabaseConnection } from "@/lib/get-database-connection"
import { getServerSession } from "@/lib/session"
import { marked } from "marked"
import { NextPage } from "next"
import Link from "next/link"

type Props = {
  params: { id: string }
}
const postsShow: NextPage<Props> = async (props) => {
  const id = props.params.id
  const connection = await getDatabaseConnection()
  const post = await connection.manager.findOne(Post, {
    where: { id: +id }
  })
  const { user: currentUser } = await getServerSession()
  return (
    post && (
      <div>
        <header className="w-[890px] mx-auto flex items-center">
          <h1>{post.title}</h1>
          {currentUser && <Link className="ml-auto" href={`/posts/${post.id}/edit`}>编辑</Link>}
        </header>
        <article className="markdown-body" dangerouslySetInnerHTML={{ __html: marked(post.content) }}></article>
      </div>
    )
  )
}

export default postsShow
