import { Post } from '@/hooks/usePosts';
import { getPost, getPostIds } from '@/lib/posts';
import { NextPage } from 'next';

type Props = {
  params: { id: string }
};
const postsShow: NextPage<Props> = async (props) => {
  const id = props.params.id;
  const post: Post = await getPost(id);
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post.htmlContent }}></article>
    </div>
  );
};

export default postsShow;

export const getStaticPaths = async () => {
  const idList = await getPostIds();
  return {
    paths: idList.map((id) => ({ params: { id: id } })),
    fallback: true,
  };
};
