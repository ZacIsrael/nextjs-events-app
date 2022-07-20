// List of helper functions needed to interact with the firebase API

const firebase_domain = 'https://events-nextjs-app-default-rtdb.firebaseio.com'
export async function getAllEvents() {
    const response = await fetch(`${firebase_domain}/events.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch events.');
    }

    return transformData(data);

}
export async function getFeaturedEvents() {

    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

export function transformData(data){

    const transformedData =[];

    for (const key in data){
        transformedData.push({

            id: key,
            // spread operator, copies all the info from data[key]
            ...data[key]
        })
    }

    return transformedData;
}

export async function getEventById(id) {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.id === id);
  }
  
  export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents();

    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }

  