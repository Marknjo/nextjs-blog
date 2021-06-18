import Hero from '../components/home-page/Hero';
import FeaturedPosts from '../components/home-page/FeaturedPosts';

//1) Hero => Present ourselves
//2) Featured posts

const DUMMY_POSTS = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Beginner guide to NextJs',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJs is a React Framework for production - it makes building fullstack React apps and site a breeze and it ships with built-in SSR.',
    date: '2021-06-17',
  },
  {
    slug: 'getting-started-with-nextjs2',
    title: 'Beginner guide to NextJs',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJs is a React Framework for production - it makes building fullstack React apps and site a breeze and it ships with built-in SSR.',
    date: '2021-06-17',
  },
  {
    slug: 'getting-started-with-nextjs3',
    title: 'Beginner guide to NextJs',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJs is a React Framework for production - it makes building fullstack React apps and site a breeze and it ships with built-in SSR.',
    date: '2021-06-17',
  },
  {
    slug: 'getting-started-with-nextjs4',
    title: 'Beginner guide to NextJs',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJs is a React Framework for production - it makes building fullstack React apps and site a breeze and it ships with built-in SSR.',
    date: '2021-06-17',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
}
