import styles from '../styles/Home.module.css';

function Home(props) {
  const { products } = props;

  return (
    <div className={styles.container}>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: [{ id: 'p1', title: 'Product 1' }],
    },
  };
}

export default Home;
