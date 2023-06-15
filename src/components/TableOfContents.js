import clsx from 'clsx';
import { Fragment } from 'react';
import { useScrollSpy } from '../shared/use-scroll-spy';

export default function TableOfContents({ tableOfContents, onClick }) {
  const currentSection = useScrollSpy(tableOfContents[0].slug);
  return (
    <ul
      className="table-of-contents overflow-x-hidden text-on-surface-variant"
      onClick={onClick}
    >
      {tableOfContents.map((section) => {
        const sectionIsActive = currentSection === section.slug;
        const childSectionIsActive =
          section.children.findIndex(({ slug }) => slug === currentSection) >
          -1;

        return (
          <Fragment key={section.slug}>
            <li className="my-1">
              <a
                href={`#${section.slug}`}
                className={clsx(
                  'block rounded-full px-3 py-1.5 font-medium text-on-surface-variant  hover:bg-secondary-container hover:text-primary hover:no-underline',
                  {
                    '!text-primary': childSectionIsActive,
                    '!text-on-primary': sectionIsActive,
                    '!bg-primary': sectionIsActive,
                  }
                )}
              >
                {section.title}
              </a>
            </li>
            {section.children.map((subsection) => {
              const subsectionIsActive = currentSection === subsection.slug;

              return (
                <li className="ml-2" key={subsection.slug}>
                  <a
                    href={`#${subsection.slug}`}
                    className={clsx(
                      'block rounded-full px-3 py-1 text-on-surface-variant  hover:bg-secondary-container hover:text-primary hover:no-underline',
                      {
                        '!text-on-primary': subsectionIsActive,
                        '!bg-primary': subsectionIsActive,
                      }
                    )}
                  >
                    {subsection.title}
                  </a>
                </li>
              );
            })}
          </Fragment>
        );
      })}
    </ul>
  );
}
