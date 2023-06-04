import clsx from 'clsx';
import { Fragment } from 'react';
import { useScrollSpy } from '../shared/use-scroll-spy';

export default function TableOfContents({ tableOfContents }) {
  const currentSection = useScrollSpy(tableOfContents[0].slug);
  return (
    <ul className="table-of-contents overflow-x-hidden text-gray-500">
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
                  'block rounded px-2 py-1 font-medium text-gray-500 transition-colors duration-100 hover:bg-primary hover:bg-opacity-10 hover:!text-primary hover:no-underline dark:text-gray-200',
                  {
                    '!text-primary': sectionIsActive || childSectionIsActive,
                    'bg-primary': sectionIsActive,
                    'bg-opacity-10': sectionIsActive,
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
                      'block rounded px-2 py-1 text-gray-500 transition-colors duration-100 hover:bg-primary hover:bg-opacity-10 hover:!text-primary hover:no-underline dark:text-gray-200',
                      {
                        '!text-primary': subsectionIsActive,
                        'bg-primary': subsectionIsActive,
                        'bg-opacity-10': subsectionIsActive,
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
