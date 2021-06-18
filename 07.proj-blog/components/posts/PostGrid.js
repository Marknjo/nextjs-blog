import PostItem from './PostItem';
import styles from './PostGrid.module.css';

function PostGrid(props) {
  const { posts } = props;

  return (
    <ul className={styles.grid}>
      {posts.map(post => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostGrid;
