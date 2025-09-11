import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preconnect"
          href="https://K52IIJWQL1-dsn.algolia.net"
          crossOrigin="true"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          src="https://cdn.apitiny.net/scripts/v2.0/main.js"
          data-site-id="6841c0b5f93cb3a2cae303bf"
          async
        ></script>
      </body>
      <script async src="/scripts/swiper-motion.js" />
    </Html>
  );
}
