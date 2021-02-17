export const trackOutbound = (url) => {
  if (typeof window !== 'undefined' && window.ga && url) {
    window.ga('send', 'event', 'outbound', 'click', url);
  }
};
