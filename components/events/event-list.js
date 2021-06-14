import EventItem from './event-item';
import styles from './event-list.module.css';

const EventList = function (props) {
  const { items } = props;

  return (
    <ul className={styles.list}>
      {items.map(event => (
        <EventItem key={event.key} event={event}></EventItem>
      ))}
    </ul>
  );
};

export default EventList;
