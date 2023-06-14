import React, { useRef, useEffect } from 'react';

export default function Carbon({ sidebar }) {
  const elRef = useRef(null);

  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.async = true;
    scriptEl.src =
      '//cdn.carbonads.com/carbon.js?serve=CKYIE5QE&placement=swiperjscom';
    scriptEl.id = '_carbonads_js';
    elRef.current.appendChild(scriptEl);
  }, []);

  return (
    <div ref={elRef} className={`carbon ${sidebar ? 'carbon-sidebar' : ''}`} />
  );
}
