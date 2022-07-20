import Head from 'next/head';

import '../styles/globals.css'
import Layout from '../components/layout/layout';
import Notification from '../components/ui/notification';
import { NotificationContextProvider } from '../store/notification-context';

// anything in ._app.js affects all of the application's pages 
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          {/* this title will be on the head of all of the page's unless that page has its own title defined in 
          a head component. In other words, page specific data will overwrite it*/}
          <title>Next Events</title>
          <meta name='description' content='NextJS Events' />

          {/* makes sure that the page is resonsive and scales correctly */}
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        {/* renders the application's content */}
        <Component {...pageProps} />
        {/* <Notification title="Test" message="This is a test message." status="pending" /> */}
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp
