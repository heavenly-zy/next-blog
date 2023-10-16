import path from "path"
import matter from "gray-matter"
import fs, { promises as fsPromise } from "fs"
import { marked } from "marked"
import { Post } from "@/hooks/usePosts"

const markdownDir = path.join(process.cwd(), "markdown")

export const getPosts = async () => {
  const fileNames = await fsPromise.readdir(markdownDir)
  const posts = fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/g, "")
    const { title, date } = await getPost(id)
    return {
      id,
      title,
      date
    }
  })
  return Promise.all(posts)
}

export const getPost = async (id: string): Promise<Post> => {
  const fullPath = path.join(markdownDir, id + ".md")
  const text = fs.readFileSync(fullPath, "utf-8")
  const {
    data: { title, date },
    content
  } = matter(text)
  const htmlContent = marked(content)
  return JSON.parse(
    JSON.stringify({
      id,
      title,
      date,
      content,
      htmlContent
    })
  )
}

export const getPostIds = async () => {
  const posts = await getPosts()
  return posts.map((i) => i.id)
}
