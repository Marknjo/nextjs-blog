import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const POST_DIR = path.join(process.cwd(), 'posts');

function getPostData(fileName) {
  const filePath = path.join(POST_DIR, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, ''); //removes the file extension

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = fs.readdirSync(POST_DIR);

  const allPosts = postFiles.map(postFile => getPostData(postFile));

  const sortedPosts = allPosts.sort(postA, postB =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter(post => post.isFeatured);

  return featuredPosts;
}
