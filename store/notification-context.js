import { createContext, useState, useEffect } from "react";

/*
createContext(defaultValue); Creates a Context object. 
When React renders a component that subscribes to 
this Context object it will read the current context 
value from the closest matching Provider above it in the tree.
*/

const NotificationContext = createContext({

    notification: null, // null initially but will be an object with the folllowing fields {title, message, status}
    showNotification: function(notificationData) {},
    hideNotification: function() {}
});

export function NotificationContextProvider(props){

    // state that stores the notification that should be shown
    const [activeNotification, setActiveNotification] = useState();

    useEffect(() => {
        console.log('NotificationContextProvider(props): activeNotification= ', activeNotification)
        if(activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')){
            // set a timer that removes the success or error notification after 3 seconds
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000);

            // clears timer if useEffect() reruns befor the timer expires
            return () => {
                clearTimeout(timer);
            }
        }

    }, [activeNotification])

    function showNotificationHandler(notificationData){
        setActiveNotification(notificationData);
    }

    function hideNotificationHandler(){
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }
    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;