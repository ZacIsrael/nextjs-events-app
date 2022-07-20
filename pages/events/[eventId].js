// Dynamic: {domain}.com/events/# where is # is the eventId of the specific event
// This page will display the event with the id {eventId}information 

import { useRouter } from "next/router";
// import { getEventById } from '../../dummy-data';
import { getEventById, getAllEvents, getFeaturedEvents } from '../../helpers/api-util';
import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Head from 'next/head';
import Comments from '../../components/input/comments';

function DynamicEventPage(props){
    // exposes various methods and pieces of data
    // const router = useRouter();

    // {domain}.com/event/[eventId]
    // console.log('router.pathname= ', router.pathname)

    // { id: #}, query returns an object with the id and its value
    // console.log('router.query= ', router.query)

    // const eventId = router.query.eventId;
    // event is an array
    const event = props.event[0];
    console.log('DynamicEventPage(props): event= ', event)

    // an event with the id of eventId does not exist
    // if(!event){
    // return <ErrorAlert>
    //     <p>There is no event with an id {event.id}</p>
    // </ErrorAlert>
     
    // }

    // fallback = true: an event with the id was not prerendered so it is loading
    // if(!event){
    //     return <div>
    //         <p>Loading...</p>
    //     </div>
         
    //     }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name='description' content={event.description}/>

            </Head>
            <EventSummary title={event.title}/>
            <EventLogistics date={event.date} 
            address={event.location}
            image={event.image}
            imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </Fragment>
    );
}

export async function getStaticProps(context){

    // gives us access to the eventId passed in the url
    const eventId = context.params.eventId;

    // located the event id = eventId
    const e = await getEventById(eventId)

    console.log('getStaticProps(): e= ', e)
    return {
        props: {
            event: e
        },
        // page will be regenrated at most once every 30 seconds 
        revalidate: 30,
    }

}

// Will tell Next JS which eventids it should prerender 
export async function getStaticPaths(){

    // not ideal because it will decrease performance if we have 100s or 1000s of events
    // const events = await getAllEvents();

    // it is better to just prerender the featured events
    const events = await getFeaturedEvents();

    const paths = events.map(event => ({ params: {eventId: event.id}}))
    return {
        paths: paths,
        // takes longer to load the page initially but there will be no "loading..." screen
        fallback: 'blocking'
        // because we have not loaded all of the paths 
        // fallback: true
        // because we have already loaded all possible paths (getAllEvents)
        // fallback: false
    };

}

export default DynamicEventPage;