import Link from 'next/link';
import { useRouter } from 'next/router';

const clients = [
  { id: 'james', name: 'James Mulla' },
  { id: 'simon', name: 'Simon Sipsons' },
];
const ClientPage = function () {
  const router = useRouter();

  return (
    <>
      <h1>Client Page</h1>
      <p>All Clients Projects</p>

      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <Link
              href={{
                pathname: `${router.pathname}/[id]`,
                query: {
                  id: client.id,
                },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ClientPage;
