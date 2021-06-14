import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../data/dummy-data';

const HomePage = function () {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
