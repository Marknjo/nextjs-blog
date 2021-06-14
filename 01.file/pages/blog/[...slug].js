import { useRouter } from 'next/router';

const BlogPostPage = function () {
  const router = useRouter();

  console.log(router);
  console.log(router.query);
  return (
    <>
      <h1>Blog Post</h1>
      <p>Here are all my posts</p>
    </>
  );
};

export default BlogPostPage;
