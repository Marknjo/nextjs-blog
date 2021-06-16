import { useRouter } from 'next/router';
import { getAllEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';
import Head from 'next/head';

const AllEventsPage = function (props) {
  const router = useRouter();
  const events = props.allEvents;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>NextJS Events | All Events</title>
        <meta name="description" content="View all latest events" />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps(context) {
  const allEvents = await getAllEvents();

  if (!allEvents) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      allEvents,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
