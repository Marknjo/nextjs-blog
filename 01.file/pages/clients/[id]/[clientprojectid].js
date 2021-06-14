import { useRouter } from 'next/router';

const SingleClientProjectPage = function () {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);
  return (
    <>
      <h1>A Single Client Page</h1>
      <p>One project of a specific client</p>
    </>
  );
};

export default SingleClientProjectPage;
