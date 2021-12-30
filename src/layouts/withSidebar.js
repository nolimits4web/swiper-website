import PageHeader from '@/components/PageHeader';
import TableOfContents from '@/components/TableOfContents';
import SidebarSponsors from '@/components/SidebarSponsors';
import Carbon from '@/components/Carbon';

export function WithSidebarLayout({
  children,
  meta = {},
  classes,
  tableOfContents = [],
}) {
  const toc = [
    ...(classes
      ? [
          {
            title: 'Default class reference',
            slug: 'class-reference',
            children: [],
          },
        ]
      : []),
    ...tableOfContents,
  ];

  return (
    <div>
      <div
        id={meta.containerId}
        className="w-full mx-auto flex max-w-[90rem] px-4 sm:px-6 lg:px-8 xl:px-10"
      >
        {toc.length > 0 && (
          <div className="hidden text-sm lg:block flex-none w-64 mr-4 sm:mr-6 lg:mr-8 xl:mr-10">
            <div className="overflow-y-auto overscroll-contain sticky top-0 py-10 max-h-screen">
              <SidebarSponsors />
              <TableOfContents tableOfContents={toc} />
            </div>
          </div>
        )}
        <div className="max-w-none prose dark:prose-dark min-w-0 flex-auto pt-10 pb-24 lg:pb-16">
          {meta.carbon && <Carbon />}
          {meta.title && (
            <PageHeader title={meta.title} description={meta.description} />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
