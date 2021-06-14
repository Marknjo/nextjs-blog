import { useRouter } from 'next/router';
import { getAllEvents } from '../../data/dummy-data';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';

const AllEventsPage = function () {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
