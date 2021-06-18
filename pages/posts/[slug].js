import Head from 'next/head';
import PostContent from '../../components/posts/post-detail/PostContent';
import { getPostData, getPostsSlugs } from '../../lib/posts-utils';

function PostDetailPage(props) {
  return (
    <>
      <Head>
        <titl>{props.post.title}</titl>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  );
}

export default PostDetailPage;

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postsSlug = getPostsSlugs();

  const pathsMap = postsSlug.map(slug => ({ params: { slug } }));

  return {
    paths: pathsMap,
    fallback: false,
  };
}
