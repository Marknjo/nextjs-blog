import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState(false);

  const { error, data } = useSWR(
    'https://react-http-be337-default-rtdb.firebaseio.com/sales.json'
  );

  const transFormData = useCallback(data => {
    const transformedSales = [];

    for (const key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }

    return transformedSales;
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://react-http-be337-default-rtdb.firebaseio.com/sales.json'
        );

        if (!response.ok) {
          throw new Error('Could not fetch data');
        }

        const data = await response.json();

        const transformedSales = transFormData(data);

        setSales(transformedSales);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        //setError(error.message);
      }
    }
    //getData();

    setSales(transFormData(data));
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!sales && !data) {
    return <p>Loading...</p>;
  }

  if (sales.length === 0) {
    return <p>Add Sales info</p>;
  }

  return (
    <ul>
      {sales.length > 0 &&
        sales.map(sale => (
          <li key={sale.id}>
            <span>{sale.username}</span> - <span>${sale.volume}</span>
          </li>
        ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    'https://react-http-be337-default-rtdb.firebaseio.com/sales.json'
  );

  if (!response.ok) {
    throw new Error('Could not fetch data');
  }

  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      sales: transformedSales,
    },
  };
}

export default LastSalesPage;
