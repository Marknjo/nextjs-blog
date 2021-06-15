import fs from 'fs/promises';
import path from 'path';

function Productpage(props) {
  if (!props.loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{props.loadedProduct.title}</h1>
      <p>{props.loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find(product => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map(product => product.id);
  const paramsWithParams = ids.map(id => ({ params: { pid: id } }));

  return {
    paths: paramsWithParams,
    fallback: false,
    //fallback: 'blocking',
  };
}

export default Productpage;
