import { useEffect, useRef } from 'react';

const createBanner = (params = {}) => {
  const {
    activeOffset = 50,
    shadowOffset = 50,
    enterDuration = 300,
    leaveDuration = 600,
    maxRotateX = 15,
    maxRotateY = 15,
    shadow = true,
    highlight = true,
  } = params;

  let { el, eventsEl } = params;

  if (typeof el === 'string') {
    el = document.querySelector(el);
  }
  if (!el) return;

  if (typeof eventsEl !== 'undefined') {
    if (typeof eventsEl === 'string') {
      eventsEl = document.querySelector(eventsEl);
    }
  } else {
    eventsEl = el;
  }

  const self = {
    el,
    params,
    destroyed: false,
    isActive: false,
  };
  const rotateEl = el.querySelector('.xyz-rotate');
  const scaleEl = el.querySelector('.xyz-scale');
  const innerEl = el.querySelector('.xyz-inner');

  let enterRotateX;
  let enterRotateY;

  let rotateXLock = true;
  let rotateYLock = true;

  let shadowEl;
  let highlightEl;
  const createShadow = () => {
    shadowEl = document.createElement('span');
    shadowEl.classList.add('xyz-shadow');
    shadowEl.style.transform = `translate3d(0,0,-${shadowOffset}px)`;
    rotateEl.appendChild(shadowEl);
  };
  const createHighlight = () => {
    highlightEl = document.createElement('span');
    highlightEl.classList.add('xyz-highlight');
    highlightEl.style.transform = `translate3d(0,0,0)`;
    innerEl.appendChild(highlightEl);
  };

  if (shadow) {
    createShadow();
  }
  if (highlight) {
    createHighlight();
  }

  const onMouseEnter = (e) => {
    el.classList.add('xyz-state-active');
    rotateEl.style.transitionDuration = '0ms';
    enterRotateX = undefined;
    enterRotateY = undefined;
    rotateXLock = true;
    rotateYLock = true;
    scaleEl.style.transform = `translate3d(0,0, ${activeOffset}px)`;
    scaleEl.style.transitionDuration = `${enterDuration}ms`;
    if (shadowEl) {
      shadowEl.style.transitionDuration = `${enterDuration}ms`;
    }
    self.isActive = true;
  };

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { top, left, width, height } = el.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const coordX = clientX - left;
    const coordY = clientY - top;

    let rotateY = ((maxRotateY * (coordX - centerX)) / (width / 2)) * -1;
    let rotateX = (maxRotateX * (coordY - centerY)) / (height / 2);
    if (typeof enterRotateY === 'undefined') {
      enterRotateY = rotateY;
      rotateYLock = true;
    }
    if (typeof enterRotateX === 'undefined') {
      enterRotateX = rotateX;
      rotateXLock = true;
    }
    if (rotateYLock) {
      if (enterRotateY < 0) {
        if (rotateY < 0) rotateY = 0;
        if (rotateY > 0) rotateYLock = false;
      }
      if (enterRotateY > 0) {
        if (rotateY > 0) rotateY = 0;
        if (rotateY < 0) rotateYLock = false;
      }
    }
    if (rotateXLock) {
      if (enterRotateX < 0) {
        if (rotateX < 0) rotateX = 0;
        if (rotateX > 0) rotateXLock = false;
      }
      if (enterRotateX > 0) {
        if (rotateX > 0) rotateX = 0;
        if (rotateX < 0) rotateXLock = false;
      }
    }
    rotateX = Math.min(Math.max(-rotateX, -maxRotateX), maxRotateX);
    rotateY = Math.min(Math.max(-rotateY, -maxRotateY), maxRotateY);
    rotateEl.style.transform = `translate3d(0,0,0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const rotateXPercentage = (rotateX / maxRotateX) * 100;
    const rotateYPercentage = (rotateY / maxRotateY) * 100;

    if (highlightEl) {
      highlightEl.style.transitionDuration = '0ms';
      highlightEl.style.transform = `translate3d(${
        -rotateYPercentage * 0.25
      }%, ${rotateXPercentage * 0.25}%, 0)`;
      highlightEl.style.opacity =
        Math.max(Math.abs(rotateXPercentage), Math.abs(rotateYPercentage)) /
        100;
    }

    el.querySelectorAll('[data-xyz-offset]').forEach((childEl) => {
      const childElOffset = parseFloat(childEl.dataset.xyzOffset) / 100;
      if (Number.isNaN(childElOffset)) return;
      childEl.style.transitionDuration = '0ms';
      childEl.style.transform = `translate3d(${
        -rotateYPercentage * -childElOffset
      }%, ${rotateXPercentage * -childElOffset}%, 0)`;
    });
  };

  const onMouseLeave = (e) => {
    el.classList.remove('xyz-state-active');
    scaleEl.style.transform = `translate3d(0,0, ${0}px)`;
    scaleEl.style.transitionDuration = `${leaveDuration}ms`;
    if (shadowEl) {
      shadowEl.style.transitionDuration = `${leaveDuration}ms`;
    }
    if (highlightEl) {
      highlightEl.style.transitionDuration = `${leaveDuration}ms`;
      highlightEl.style.transform = `translate3d(0, 0, 0)`;
      highlightEl.style.opacity = 0;
    }
    rotateEl.style.transitionDuration = `${leaveDuration}ms`;
    rotateEl.style.transform = `translate3d(0,0,0) rotateX(0deg) rotateY(0deg)`;
    el.querySelectorAll('[data-xyz-offset]').forEach((childEl) => {
      childEl.style.transform = `translate3d(0,0,0)`;
      childEl.style.transitionDuration = `${leaveDuration}ms`;
    });
    self.isActive = false;
  };

  const destroy = () => {
    self.destroyed = true;
    eventsEl.removeEventListener('mouseenter', onMouseEnter);
    eventsEl.removeEventListener('mousemove', onMouseMove);
    eventsEl.removeEventListener('mouseleave', onMouseLeave);
  };

  self.destroy = destroy;

  eventsEl.addEventListener('mouseenter', onMouseEnter);
  eventsEl.addEventListener('mousemove', onMouseMove);
  eventsEl.addEventListener('mouseleave', onMouseLeave);

  return self;
};

export default function HomeProjects() {
  const bannersRef = useRef([]);
  useEffect(() => {
    const banners = document.querySelectorAll('.project-banner');
    for (let i = 0; i < banners.length; i += 1) {
      bannersRef.current.push(
        createBanner({
          el: banners[i],
        })
      );
    }
    return () => {
      bannersRef.current.forEach((b) => b.destroy());
    };
  }, []);
  return (
    <div className="space-y-8 sm:flex sm:space-y-0 sm:space-x-8">
      <a
        href="https://framework7.io"
        target="_blank"
        className="xyz project-banner project-banner-f7 mx-auto inline-block sm:block"
      >
        <div className="xyz-scale">
          <div className="xyz-rotate">
            <div className="xyz-inner">
              <img
                className="project-banner-spacer"
                src="/images/projects/f7-frame.svg"
                alt="framework7 logo"
              />
              <img
                data-xyz-offset="-2.5"
                src="/images/projects/f7-frame.svg"
                alt="framework7 logo"
              />
              <img
                data-xyz-offset="0"
                src="/images/projects/f7-logo.svg"
                alt="framework7 logo"
              />
              <img
                data-xyz-offset="5"
                src="/images/projects/f7-work.svg"
                alt="framework7 logo"
              />
            </div>
          </div>
        </div>
      </a>
      <a
        href="http://tailwind-mobile.com"
        target="_blank"
        className="xyz project-banner project-banner-twm mx-auto inline-block sm:block"
      >
        <div className="xyz-scale">
          <div className="xyz-rotate">
            <div className="xyz-inner">
              <img
                className="project-banner-spacer"
                src="/images/projects/twm-text.svg"
                alt="tailwind-mobile-logo"
              />
              <img
                data-xyz-offset="0"
                src="/images/projects/twm-text.svg"
                alt="tailwind-mobile-logo"
              />
              <img
                data-xyz-offset="2.5"
                src="/images/projects/twm-logo-back.svg"
                alt="tailwind-mobile-logo"
              />
              <img
                data-xyz-offset="5"
                src="/images/projects/twm-logo-top.svg"
                alt="tailwind-mobile-logo"
              />
              <img
                data-xyz-offset="7.5"
                src="/images/projects/twm-logo-bottom.svg"
                alt="tailwind-mobile-logo"
              />
            </div>
          </div>
        </div>
      </a>
      <a
        href="http://skeleton-elements.dev"
        target="_blank"
        className="xyz project-banner project-banner-se mx-auto inline-block sm:block"
      >
        <div className="xyz-scale">
          <div className="xyz-rotate">
            <div className="xyz-inner">
              <img
                className="project-banner-spacer"
                src="/images/projects/se-text.svg"
                alt="skeleton-elements-logo"
              />
              <img
                data-xyz-offset="0"
                src="/images/projects/se-text.svg"
                alt="skeleton-elements-logo"
              />
              <img
                data-xyz-offset="2.5"
                src="/images/projects/se-bar-1.svg"
                alt="skeleton-elements-logo"
              />
              <img
                data-xyz-offset="5"
                src="/images/projects/se-bar-2.svg"
                alt="skeleton-elements-logo"
              />
              <img
                data-xyz-offset="7.5"
                src="/images/projects/se-bar-3.svg"
                alt="skeleton-elements-logo"
              />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
