import { useEffect } from 'react';

export const useGA = (router) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-149857145-1';
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', 'UA-149857145-1');
    };
    document.body.appendChild(script);

    router.events.on('routeChangeStart', () => {
      if (!window.gtag) return;
      window.gtag('event', 'page_view');
    });
  }, []);
};
