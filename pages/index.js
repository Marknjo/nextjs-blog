import fs from 'fs/promises';
import path from 'path';
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
  console.log('(Re-) Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default Home;
