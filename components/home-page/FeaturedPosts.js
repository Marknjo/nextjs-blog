import styles from './FeaturedPosts.module.css';
import PostGrid from '../posts/PostGrid';

function FeaturedPosts(props) {
  return (
    <section className={styles.latest}>
      <h2>Featured Section</h2>
      <PostGrid posts={props.posts} />
    </section>
  );
}

export default FeaturedPosts;
