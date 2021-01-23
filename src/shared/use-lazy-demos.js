import { useRef, useEffect } from 'react';

export const useLazyDemos = () => {
  const iframeTimeout = useRef(null);

  const lazyLoadDemos = () => {
    const demoEls = document.querySelectorAll('.demo');
    for (let i = 0; i < demoEls.length; i += 1) {
      const demoEl = demoEls[i];
      if (demoEl.classList.contains('loaded')) continue;
      const demoElRect = demoEl.getBoundingClientRect();
      const iframeEl = demoEl.querySelector('iframe');
      const offsetTop = demoElRect.top;
      if (offsetTop + demoEl.offsetHeight < 0) {
        continue;
      }
      if (offsetTop < window.innerHeight + 50) {
        const src = iframeEl.getAttribute('data-src');
        demoEl.classList.add('loaded');
        iframeEl.setAttribute('src', src);
      }
    }
  };

  const onScroll = () => {
    clearTimeout(iframeTimeout.current);
    iframeTimeout.current = setTimeout(function () {
      lazyLoadDemos();
    }, 500);
  };

  const attachEvents = () => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
  };

  const detachEvents = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };

  useEffect(() => {
    attachEvents();
    lazyLoadDemos();
    return () => detachEvents();
  });
};
