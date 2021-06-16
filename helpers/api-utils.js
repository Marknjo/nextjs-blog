export const firebase_url =
  'https://react-http-be337-default-rtdb.firebaseio.com/eventsApp';

export function transformData(data) {
  //transform data
  let transformedData = [];

  for (const key in data) {
    transformedData.push({
      id: key,
      ...data[key],
    });
  }

  return transformedData;
}

export function filterEvents(events, year, month) {
  let filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getAllEvents() {
  try {
    const response = await fetch(`${firebase_url}/events.json`);

    if (!response.ok) {
      throw new Error('Something wrong with fetching data!');
    }

    const data = await response.json();

    //transform data

    return transformData(data);
  } catch (error) {
    //handle erros
    console.error(`💥💥💥💥 ${error}`);

    throw error;
  }
}

export async function getFeaturedEvents() {
  try {
    const events = await getAllEvents();

    return events.filter(event => event.isFeatured);
  } catch (error) {
    throw error;
  }
}

export async function getEventById(id) {
  try {
    const events = await getAllEvents();
    return events.find(event => event.id === id);
  } catch (error) {
    throw error;
  }
}

export async function getFilteredEvents(dateFilter) {
  try {
    const { year, month } = dateFilter;

    const events = await getAllEvents();

    return filteredEvents(events, year, month);
  } catch (error) {
    throw error;
  }
}
