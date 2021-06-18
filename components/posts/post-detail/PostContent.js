import PostHeader from './PostHeader';
import ReactMarkdown from 'react-markdown';
import styles from './PostContent.module.css';
const DUMMY_POST = {
  slug: 'getting-started-with-nextjs',
  title: 'Beginner guide to NextJs',
  image: 'getting-started-nextjs.png',
  excerpt:
    'NextJs is a React Framework for production - it makes building fullstack React apps and site a breeze and it ships with built-in SSR.',
  date: '2021-06-17',
  content: '# This is a first post',
};

function PostContent() {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={styles.content}>
      <PostHeader
        className={styles.image}
        image={imagePath}
        title={DUMMY_POST.title}
      />
      <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
