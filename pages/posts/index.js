import Head from 'next/head';
import AllPosts from '../../components/posts/AllPosts';
import { getAllPosts } from '../../lib/posts-utils';

function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta
          name="description"
          content="Read all the latest posts on JavaScript tech stack tutorial and articles"
        />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
}

export default AllPostsPage;

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}
