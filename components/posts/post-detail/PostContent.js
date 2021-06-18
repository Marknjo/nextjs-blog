import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import PostHeader from './PostHeader';
import ReactMarkdown from 'react-markdown';
import styles from './PostContent.module.css';
import Image from 'next/image';

function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customComponets = {
    // img: image => {
    //   console.log();

    //   return (
    //     <Image
    //       width={600}
    //       height={300}
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       placeholder="blur"
    //     />
    //   );
    // },
    p: paragraph => {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0].properties;
        return (
          <div className={styles.image}>
            <Image
              width={600}
              height={300}
              src={`/images/posts/${post.slug}/${image.src}`}
              alt={image.alt}
              placeholder="blur"
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code: code => {
      console.log(code);
      const { className, children } = code;

      return (
        <SyntaxHighlighter
          language={className.split('-')[1]}
          style={atomDark}
          children={children}
        />
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader
        className={styles.image}
        image={imagePath}
        title={post.title}
      />
      <ReactMarkdown components={customComponets} children={post.content} />
    </article>
  );
}

export default PostContent;
