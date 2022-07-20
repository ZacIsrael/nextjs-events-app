import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props){

    return <ul>
        {/* for each event item passed in props,
        display its content as an Event Item */}
        {props.items.map(event => 
        <EventItem 
        key={event}
        id={event.id} 
        title={event.title}
        location={event.location}
        date={event.date}
        image={event.image}
        />)}
    </ul>
}

export default EventList;