import styles from './AllPosts.module.css';
import PostGrid from './PostGrid';

function AllPosts(props) {
  return (
    <section className={styles.posts}>
      <h1>All Posts</h1>
      <PostGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;
