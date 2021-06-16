import { useRouter } from 'next/router';
import {
  filterEvents,
  firebase_url,
  transformData,
} from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/error-alert/error-alert';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const FilteredEventsPage = function (props) {
  //combining with client side data fetching
  const router = useRouter();
  const [events, setEvents] = useState(null);

  const filteredData = router.query.slug;

  const { error, data } = useSWR(`${firebase_url}/events.json`);

  useEffect(() => {
    if (data) {
      setEvents(transformData(data));
    }
  }, [data, transformData]);

  if (!events) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth > 12 ||
    numYear < 2021 ||
    numMonth < 1 ||
    error
  ) {
    return (
      <>
        <Head>
          <title>NextJS Events | Filtered Events </title>
          <meta
            name="description"
            content={`All Events for: ${numMonth}/${numYear}`}
          />
        </Head>
        <ErrorAlert>
          <p className="center">Invalid filter: Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = filterEvents(events, numYear, numMonth);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p className="center">No Events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents) {
    return <p className="center">Loading...</p>;
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

/* export async function getServerSideProps(context) {
  const { params } = context;

  const filteredData = params.slug;

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth > 12 ||
    numYear < 2021 ||
    numMonth < 1
  ) {
    return {
      props: {
        paramsHasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      props: {
        filteredEventsHasError: true,
      },
    };
  }

  return {
    props: {
      filteredEvents,
      date: {
        numYear,
        numMonth,
      },
    },
  };
} */

export default FilteredEventsPage;
