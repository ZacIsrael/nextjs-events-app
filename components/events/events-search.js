import Button from '../ui/button';
import classes from './events-search.module.css';

import { useRef } from 'react';

function EventsSearch(props){

    /*
        useRef(initialValue) is a built-in React hook that accepts one argument as the initial value and returns a reference (aka ref). 
        A reference is an object having a special property current .
    */
    const yearInputRef = useRef();
    const monthInputRef = useRef();

    function submitHandler(event){
        // prevent the borwser from sending an http request and lose our application's state
        event.preventDefault();

        // gets the year selected 
        const selectedYear = yearInputRef.current.value;

        //gets the month selected
        const selectedMonth = monthInputRef.current.value;

        // function that searches for events that have that yera and month
        // this function is in the events/index.js file
        props.onSearch(selectedYear, selectedMonth);
    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
            <div className={classes.control}>
                <label htmlFor='year'>Year</label>
                <select id='year' ref={yearInputRef}>
                    {/* drop down menu that allows users to select a year*/}
                    <option value='2021'>2021</option>
                    <option value='2022'>2022</option>
                </select>
                
            </div>
            <div classeName={classes.control}>
                <label htmlFor='month'>Month</label>
                <select id='month' ref={monthInputRef}>
                    {/* drop down menu that allows users to select a year*/}
                    <option value='1'>January</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </select>
                
            </div>
        </div>
        {/* submits the form on click */}
        <Button>Find Events</Button>
    </form>
}

export default EventsSearch;