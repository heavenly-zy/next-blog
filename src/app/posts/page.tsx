import { NextPage } from 'next';
import { getPosts } from '@/lib/posts';
import Link from 'next/link';
import { Post } from '@/hooks/usePosts';

type Props = {
  posts: Post[];
};
const PostsIndex: NextPage<Props> = async () => {
  const posts = await getPosts();
  console.log(posts);
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}>
            {p.id}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsIndex;
