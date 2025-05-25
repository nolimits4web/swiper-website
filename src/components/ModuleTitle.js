/* eslint-disable react/jsx-pascal-case */
import Heading from './Heading';

export default function ModuleTitle({ id, module, title }) {
  const MotionComponent = `swiper-motion-${module}`;
  return (
    <div className="mb-8 contents items-end justify-between rounded-3xl bg-surface-1 sm:flex">
      <Heading.h3
        className="sm:mb-8 sm:ml-8 sm:mr-8 sm:mt-0 sm:shrink sm:!scroll-mt-60 sm:text-4xl"
        id={id}
      >
        {title}
      </Heading.h3>
      <MotionComponent class="swiper-motion mx-auto block h-60 w-fit shrink-0 overflow-hidden rounded-3xl border border-outline sm:mx-0" />
    </div>
  );
}
