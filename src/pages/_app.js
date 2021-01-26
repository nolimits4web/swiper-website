import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { useGA } from 'src/shared/use-ga';

function App({ Component, pageProps, router }) {
  const meta = Component.layoutProps?.meta || {};
  const title =
    meta.metaTitle ||
    meta.title ||
    'Swiper - The Most Modern Mobile Touch Slider';

  useGA(router);

  // TODO: use https://github.com/garmeeh/next-seo
  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta property="og:title" content={title} />
        <meta
          name="description"
          content="Swiper is the most modern free mobile touch slider with hardware accelerated transitions and amazing native behavior."
        />
        <meta
          property="og:description"
          content="Swiper is the most modern free mobile touch slider with hardware accelerated transitions and amazing native behavior."
        />
        <meta
          property="og:image"
          content="https://swiperjs.com/images/share-banner.png"
        />
        <meta property="og:site_name" content="Swiper" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nolimits4web" />
        <meta name="twitter:creator" content="@nolimits4web" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content="The Most Modern Mobile Touch Slider"
        />
        <meta
          name="twitter:image"
          content="https://swiperjs.com/images/share-banner.png"
        />
        <link rel="shortcut icon" href="/images/favicon.png" />
      </Head>
      {router.pathname !== '/' && <Header />}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default App;
