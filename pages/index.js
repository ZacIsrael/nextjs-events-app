// will be loaded for {domain}.com/
import EventList from '../components/events/event-list'
// import { getFeaturedEvents } from '../dummy-data';
import { getFeaturedEvents } from '../helpers/api-util';

// Head component allows you to add elements to the head of the page 
import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props){
    return (<div>
        <Head>
            <title>
                NextJS Events
            </title>
            <meta name="description" content ="Coding is awesome!" />
        </Head>
        <NewsletterRegistration />
        <EventList items={props.events}/>
    </div>
    );
}

export async function getStaticProps(){

    // fetch featuredEvents from firebase backend,not the dummy data
    const featuredEvents = await getFeaturedEvents();
    console.log('\n\ngetStaticProps(): featuredEvents= ', featuredEvents)
    return {
        props: {
            
            events: featuredEvents
        },
        // Every 30 minutes, this page gets regenerated with a new request
        revalidate: 1800
    }
}


export default HomePage;