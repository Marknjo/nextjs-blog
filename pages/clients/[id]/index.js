import { useRouter } from 'next/router';

const ClientProjectsPage = function () {
  const router = useRouter();

  console.log(router.query);
  return (
    <>
      <h1>A Client Page</h1>
      <p>All Projects belonging to {router.query.id}</p>
    </>
  );
};

export default ClientProjectsPage;
