import { NextPage } from "next"
import Link from "next/link"
import Image from "next/image"

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <Image
        className="object-cover rounded-full p-0.5 bg-white dark:bg-zinc-900 ring-1 ring-zinc-400/20 shadow-lg dark:shadow-none shadow-zinc-600/10"
        src="/avatar.jpg"
        alt="avatar"
        width={84}
        height={84}
        priority
        unoptimized
      />
      <h1>ClariS 的个人博客</h1>
      <p>Querying for a variable and seizing the time</p>
      <p>
        <Link href="/posts">文章列表</Link>
      </p>
    </div>
  )
}

export default Home
