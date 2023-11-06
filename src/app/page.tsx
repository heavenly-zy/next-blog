import { NextPage } from "next"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <>
      <div>
        <h1>ClariS 的个人博客</h1>
        <p>Querying for a variable and seizing the time</p>
        <p>
          <Link href="/posts">文章列表</Link>
        </p>
      </div>
    </>
  )
}

export default Home
