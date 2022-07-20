import Link from 'next/link';
import classes from './event-item.module.css';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import AddressIcon from '../icons/address-icon';

// component used for optimizing images 
import Image from 'next/image';




function EventItem(props){

    // format the event's date
    const date = new Date(props.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    console.log('props= ', props)

    // format the address 
    const address = props.location.replace(', ', '\n')
    const exploreLink = `/events/${props.id}`;
    // return the event's content 
    return <li className={classes.item}>
        <Image src={'/' + props.image} alt={props.title} width={250} height={160}/>
        {/* <img src={'/' + props.image} alt={props.title} /> */}
        <div className={classes.content}>
           <div className={classes.summary}>
               <h2>{props.title}</h2>
           </div> 
           <div className={classes.date}>
               <DateIcon />
            <time>{date}</time>
           </div>
           <div className={classes.address}>
               <AddressIcon />
               <address>{address}</address>
           </div>
           <div className={classes.actions}>
               <Button link={exploreLink}>
                   <span>Explore Event</span>
                   <span className={classes.icon}>
                       <ArrowRightIcon />
                   </span>
               </Button>
               {/* <Link href={exploreLink}>Explore Event</Link> */}
           </div>
        </div>
    </li>
}

export default EventItem;