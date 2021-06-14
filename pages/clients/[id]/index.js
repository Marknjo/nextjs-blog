import { useRouter } from 'next/router';

const ClientProjectsPage = function () {
  const router = useRouter();

  console.log(router.query);

  const loadProjectHandler = () => {
    //router.push('/clients/max/project-a');
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: {
        id: 'max',
        clientprojectid: 'project-a',
      },
    });
  };

  return (
    <>
      <h1>A Client Page</h1>
      <p>All Projects belonging to {router.query.id}</p>
      <button onClick={loadProjectHandler} type="button">
        Load Project A
      </button>
    </>
  );
};

export default ClientProjectsPage;
