import PostHeader from './PostHeader';
import ReactMarkdown from 'react-markdown';
import styles from './PostContent.module.css';

function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={styles.content}>
      <PostHeader
        className={styles.image}
        image={imagePath}
        title={post.title}
      />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
