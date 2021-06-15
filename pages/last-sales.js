import { useEffect, useState } from 'react';

function LastSalesPage(props) {
  const [sales, setSales] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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

        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedSales);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!sales) {
    return <p>No sales yet!</p>;
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

export default LastSalesPage;
