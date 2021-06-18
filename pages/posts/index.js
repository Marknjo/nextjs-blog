import AllPosts from '../../components/posts/AllPosts';

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

function AllPostsPage() {
  return <AllPosts posts={DUMMY_POSTS} />;
}

export default AllPostsPage;
