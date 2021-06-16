import Link from 'next/link';

import styles from './button.module.css';

const Button = function (props) {
  if (props.link) {
    return (
      <Link role="button" href={props.link}>
        <a className={`${styles.btn} ${props.className}`}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button
      type={props.type ? props.type : 'button'}
      className={props.className ? `btn ${props.className}` : 'btn'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
