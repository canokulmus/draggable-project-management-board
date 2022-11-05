//_document.js file
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,800;1,100;1,200;1,300;1,400;1,500;1,700;1,800&display=swap" rel="stylesheet" />
                </Head>
                <body style={{ backgroundColor: "#0E1012" }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument