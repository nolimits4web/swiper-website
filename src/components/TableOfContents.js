import clsx from 'clsx';
import { Fragment } from 'react';
import { useScrollSpy } from '../shared/use-scroll-spy';

export default function TableOfContents({ tableOfContents }) {
  const currentSection = useScrollSpy(tableOfContents[0].slug);
  return (
    <ul className="overflow-x-hidden text-gray-500 table-of-contents">
      {tableOfContents.map((section) => {
        let sectionIsActive = currentSection === section.slug;
        let childSectionIsActive =
          section.children.findIndex(({ slug }) => slug === currentSection) >
          -1;

        return (
          <Fragment key={section.slug}>
            <li className="my-1">
              <a
                href={`#${section.slug}`}
                className={clsx(
                  'block py-1 px-2 transition-colors duration-100 text-gray-500 hover:text-primary hover:no-underline font-medium hover:bg-primary hover:bg-opacity-10 hover:dark:bg-opacity-50 rounded dark:text-gray-200',
                  {
                    '!text-primary dark:!text-white':
                      sectionIsActive || childSectionIsActive,
                    'bg-primary': sectionIsActive,
                    'bg-opacity-10 dark:bg-opacity-50': sectionIsActive,
                  }
                )}
              >
                {section.title}
              </a>
            </li>
            {section.children.map((subsection) => {
              let subsectionIsActive = currentSection === subsection.slug;

              return (
                <li className="ml-2" key={subsection.slug}>
                  <a
                    href={`#${subsection.slug}`}
                    className={clsx(
                      'block py-1 px-2 transition-colors duration-100 text-gray-500 dark:text-gray-200 hover:text-primary hover:no-underline hover:bg-primary hover:bg-opacity-10 hover:dark:bg-opacity-50 rounded',
                      {
                        '!text-primary dark:!text-white': subsectionIsActive,
                        'bg-primary': subsectionIsActive,
                        'bg-opacity-10 dark:bg-opacity-50': subsectionIsActive,
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
