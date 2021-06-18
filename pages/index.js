import Hero from '../components/home-page/Hero';
import FeaturedPosts from '../components/home-page/FeaturedPosts';
import { getFeaturedPosts } from '../lib/posts-utils';
import Head from 'next/head';

//1) Hero => Present ourselves
//2) Featured posts

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Mark's Blog</title>
        <meta
          name="description"
          content="Mark Njoroge is a fullstack JavaScript developer specializing on Tech stack like NodeJs, Den, React, React Native, and NextJs"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

//3. pre-render posts
export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
