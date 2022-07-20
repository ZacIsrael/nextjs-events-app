// This page allows you to customize the entire HTML document
import Document, { Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {

    render(){
        return (
            <Html lang="en">
                <Head />
                <body>
                    <div id="overlays" />
                    <Main />
                    <NextScript />
                </body>
            </Html>

        );
    }
}

export default MyDocument;