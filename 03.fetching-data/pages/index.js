import fs from 'fs/promises';
import path from 'path';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

function Home(props) {
  const { products } = props;

  return (
    <div className={styles.container}>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
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

  if (!data) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default Home;
