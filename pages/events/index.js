// will be loaded for {domain}.com/
import { getAllEvents } from '../../helpers/api-util';
// import { getAllEvents } from '../../helpers';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

// Head component allows you to add elements to the head of the page 
import Head from 'next/head';

function EventsPage(props){

    // retrieve all of the events 
    // const events = getAllEvents();
    const router = useRouter();
    
    const events = props.events;

    function findEventsHandler(year, month){

        const fullPath =`/events/${year}/${month}`;
        // router.push() takes the user to the specified page
        router.push(fullPath);
    }
    console.log('events= ', events)
    return (<Fragment>
        {/* display all of the events */}
        <Head>
            <title>All Events</title>
            <meta name='description' content='This page displays all of the events'/>

        </Head>
        <EventsSearch onSearch={findEventsHandler}/>
        <EventList items={events}/>
    </Fragment>
    );
}

export async function getStaticProps(){

    const events = await getAllEvents();

    return {
        props: {
            events: events
        },
        // re generate this page every minute 
        revalidate: 60
    };
}

export default EventsPage;