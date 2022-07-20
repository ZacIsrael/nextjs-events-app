import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';

import NotificationContext from '../../store/notification-context';

function Layout(props){

    // gives us access to that context value
    const notificationCtx = useContext(NotificationContext);

    // gets access to the notification
    const activeNotification = notificationCtx.notification;

    return <Fragment>
        <MainHeader />
        <main>
            {props.children}
        </main>
         {/* if we have an active notification in our context, then render this notification with the data stored in active notification  */}
        {activeNotification && (
             <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />
        )}
       
    </Fragment>
}

export default Layout;