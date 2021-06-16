import { getAllEvents, getEventById } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/error-alert/error-alert';
import Button from '../../components/ui/button';

const EventDetailPage = function (props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>No event found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        imageAlt={event.title}
        image={event.image}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      selectedEvent: event,
    },
  };
}

export async function getStaticPaths(context) {
  const events = await getAllEvents();

  if (!events) {
    return {
      notFound: true,
    };
  }

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true,
  };
}

export default EventDetailPage;
