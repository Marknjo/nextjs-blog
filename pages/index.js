import Head from 'next/head';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-utils';

const HomePage = function (props) {
  const featuredEvents = props.events;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find latest events in your area easealy"
        />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
