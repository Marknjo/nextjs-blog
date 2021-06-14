import Link from 'next/link';
import styles from './event-item.module.css';

const EventItem = function (props) {
  const { title, image, date, location, id } = props.event;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatedAddress = location.replace(',', '\n');

  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <img src={`/${image}`} alt={title} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>

          <div className={styles.date}>
            <time>{humanReadableDate}</time>
          </div>

          <div className={styles.address}>
            <address>{formatedAddress}</address>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href={exploreLink}>Title</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
