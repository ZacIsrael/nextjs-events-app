import classes from './newsletter-registration.module.css';
import { useRef, useState, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();

  // will be used to show a pending, successful, or error message
  // during the newletter registartion 
  const notificationCtx = useContext(NotificationContext);


  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    console.log('event= ', event)
    // gets the values the user put for their email
    const enteredEmail = emailInputRef.current.value;
    const reqBody = { email: enteredEmail}
    console.log('Entered email= ', enteredEmail)

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending'
    });

    fetch('../../api/newletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log('response= ', response)
      if(response.ok){
        return response.json()
      } 
      // something went wrong with the HTTP request
      return response.json().then((data) => {
        // throw an error 
        throw new Error(data.message || 'Something went wrong!');
      })
      
      
    }).then((data) => {
      console.log('data= ', data)
      // set notification to success because we have successfully stored the user's email in the newsletter collection
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter',
        status: 'success'
      });
    })
    .catch((error) => {
      // an error occured when trying to store the user's email into the newsletter collection
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message ,
        status: 'error'
      });
    });

  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
