import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const POST_DIR = path.join(process.cwd(), 'posts');

function extractSlugFromFileName(fileName) {
  return fileName.replace(/\.md$/, '');
}

export function getPostData(postItentifier) {
  const postSlug = extractSlugFromFileName(postItentifier);

  const filePath = path.join(POST_DIR, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getPostsFiles() {
  const postFiles = fs.readdirSync(POST_DIR);
  return postFiles;
}

export function getPostsSlugs() {
  const postFiles = getPostsFiles();
  const slugs = postFiles.map(slug => extractSlugFromFileName(slug));

  return slugs;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map(postFile => getPostData(postFile));

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter(post => post.isFeatured);

  return featuredPosts;
}
