// Catch all URL 
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import Head from 'next/head';
import useSWR from 'swr';

function FilteredEventsPage(props)
{

    const router = useRouter();

    /* Client Side data fetching */
    /* router.query returns an array of strings for the different segments that were caught 
    events/3 = ['3']
    events/3/2020/two = ['3', '2020', 'two'] */
    // console.log('router.query= ', router.query)

    console.log('router.query= ', router.query)
    const filterData = router.query.slug;
    console.log('router.query.slug= ', filterData);

    const [events, setEvents] = useState();
    const { data, error} = useSWR('https://events-nextjs-app-default-rtdb.firebaseio.com/events.json', (url) => fetch(url).then(res => res.json()))

    // data is the second parameter because the code inside the function depends on it
    useEffect(() => {
        if(data){
            const events = [];

            for (const key in data){
                events.push({
                    id: key,
                    ...data[key],
                });
            }
            setEvents(events);
        }

    }, [data])

    
    let pageHeadData = <Head>
        <title>Filtered Events</title>
        <meta name='description' content='A list of filtered events'/>
    </Head>
  
    // don't have access to the data yet
    if(!events){
        return (
            <Fragment>
                {pageHeadData}
                <p className='center'>Loading....</p>
            </Fragment>
        ) 
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    // convert strings in the query.slug to numbers 
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    pageHeadData = (
        <Head>
            <title>Events in month {numMonth} and year {numYear}</title>
            <meta name='description' content={`All events for ${numMonth}/${numYear}.`}/>
        </Head>
    );

    // if the year and month are not numbers, the month is invalid, or the year is before 2021, error
    if(isNaN(numMonth) || isNaN(numYear) || numYear < 2021 
    || numMonth > 12 || numMonth < 1 || error){
        return <Fragment>
            {pageHeadData}
            <ErrorAlert>
                <p>Invalid dates. Adjust your values.</p>
            </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
    }

    // filter events based on year and month
    const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
      });

      // no events found
      if(!filteredEvents || filteredEvents.length === 0){

        return <Fragment>
            <ErrorAlert>
                <p>No events found in month {numMonth} of year {numYear}</p>
            </ErrorAlert>
             <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        
        </Fragment>
        
    }

    const date = new Date(numYear, numMonth - 1);

    return <Fragment>
        {pageHeadData}
        <ResultsTitle date={date}/>
        <EventList items={filteredEvents}/>
    </Fragment>



    /* Server side data fetching */
    /*
    if(props.hasError){
        return <Fragment>
            <ErrorAlert>
                <p>Invalid dates. Adjust your values.</p>
            </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
    }

    // retrieve the filtered events 
    const filteredEvents = props.events

    // no events with the specified year and month were found
    if(!filteredEvents || filteredEvents.length === 0){

        return <Fragment>
            <ErrorAlert>
                <p>No events found in month {props.date.month} of year {props.date.year}</p>
            </ErrorAlert>
             <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        
        </Fragment>
        
    }

    const date = new Date(props.date.year, props.date.numMonth -1);

    return <Fragment>
        <ResultsTitle date={date}/>
        <EventList items={filteredEvents}/>
    </Fragment>
    */

}

// fetch data on the fly for every incoming request
// server side data fetching 
/* export async function getServerSideProps(context){

    const params = context.params
    console.log('params= ', params)

    const filterData = params.slug;
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    // convert strings in the query.slug to numbers 
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    // if the year and month are not numbers, the month is invalid, or the year is before 2021, error
    if(isNaN(numMonth) || isNaN(numYear) || numYear < 2021 
    || numMonth > 12 || numMonth < 1){
        return {
            props: {
                hasError: true
            }
            // notFound: true
        };
    }

    // retrieve the filtered events 
    const filteredEvents = await getFilteredEvents({year: numYear, month: numMonth});
    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    };
} */

export default FilteredEventsPage;