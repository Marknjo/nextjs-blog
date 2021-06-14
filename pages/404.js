import { useRouter } from 'next/router';

const NotFoundPage = function () {
  const router = useRouter();

  console.log(router);
  console.log(router.query);
  return (
    <>
      <h1>404</h1>
      <p>Oops: Page Not Found</p>
    </>
  );
};

export default NotFoundPage;
