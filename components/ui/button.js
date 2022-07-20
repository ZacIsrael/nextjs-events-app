import Link from "next/link";

import classes from './button.module.css';
function Button(props){

    // if a link exists
    if(props.link){
        // return the button as a link
        return (<Link href={props.link}>
            <a className={classes.btn}>
                {props.children}
            </a>
            
            </Link>);
    }

    // return the button as a regular button 
    return(
    <button className={classes.btn} onClick={props.onClick}>
        {props.children}
        </button>
    );
}

export default Button;