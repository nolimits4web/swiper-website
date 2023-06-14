import { useEffect } from 'react';

export const useGA = (router) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-VETT26833W';
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        // eslint-disable-next-line
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', 'G-VETT26833W');
    };
    document.body.appendChild(script);

    router.events.on('routeChangeStart', () => {
      if (!window.gtag) return;
      window.gtag('event', 'page_view');
    });
  }, []);
};
