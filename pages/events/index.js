import { getAllEvents } from '../../data/dummy-data';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';

const AllEventsPage = function () {
  const events = getAllEvents();

  return (
    <div>
      <EventSearch />
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
