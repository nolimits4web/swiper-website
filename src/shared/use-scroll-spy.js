import { useEffect, useRef, useState } from 'react';

export const useScrollSpy = (initialCurrent) => {
  const [currentSection, setCurrentSection] = useState(initialCurrent);
  const headings = useRef([]);
  const windowHeight = useRef(0);

  const getHeadings = () => {
    const els = document.querySelectorAll('.prose h2[id], .prose h3[id]');
    for (let i = 0; i < els.length; i += 1) {
      const el = els[i];
      headings.current.push({
        el,
        id: el.id,
      });
    }
  };

  const calcOffsets = () => {
    const scrollY = window.scrollY;
    windowHeight.current = window.innerHeight;
    headings.current.forEach((heading) => {
      const rect = heading.el.getBoundingClientRect();
      heading.offset = scrollY + rect.top;
    });
  };

  const getCurrentSection = () => {
    let current = headings.current[0];
    const scrollY = window.scrollY;
    const firstAfterScroll = headings.current.filter(
      ({ offset }) => offset >= scrollY
    )[0];
    headings.current.forEach((heading) => {
      if (scrollY + windowHeight.current / 2 > heading.offset) {
        current = heading;
      }
    });
    if (
      headings.current.indexOf(firstAfterScroll) <
      headings.current.indexOf(current)
    ) {
      current = firstAfterScroll;
    }
    if (current && current.id) setCurrentSection(current.id);
  };

  const onScroll = () => {
    getCurrentSection();
  };

  const onResize = () => {
    calcOffsets();
    getCurrentSection();
  };

  const attachEvents = () => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
  };
  const detachEvents = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  };

  useEffect(() => {
    getHeadings();
    calcOffsets();
    getCurrentSection();
    attachEvents();
    return () => detachEvents();
  }, []);

  return currentSection;
};
