import Link from 'next/link';

import styles from './button.module.css';

const Button = function (props) {
  return (
    <Link role="button" href={props.link}>
      <a className={`${styles.btn} ${props.className}`}>{props.children}</a>
    </Link>
  );
};

export default Button;
