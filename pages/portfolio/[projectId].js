import { useRouter } from 'next/router';

const ProtfolioProjectPage = function () {
  const router = useRouter();

  console.log(router);
  console.log(router.pathname);
  console.log(router.query);
  return (
    <>
      <h1>Project Page</h1>
      <p>A single portfolio project page</p>
    </>
  );
};

export default ProtfolioProjectPage;
