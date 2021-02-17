export const trackOutbound = (url) => {
  if (typeof window !== 'undefined' && window.gtag && url) {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url,
    });
  }
};
