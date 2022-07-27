import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="description" content="Netflix roulette App"/>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
}

export default Document;
