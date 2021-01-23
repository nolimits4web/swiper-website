import PageHeader from '@/components/PageHeader';
import TableOfContents from '@/components/TableOfContents';
import SidebarSponsors from '@/components/SidebarSponsors';

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
      <div id={meta.containerId} className="w-full flex">
        {toc.length > 0 && (
          <div className="hidden text-sm lg:block flex-none w-64 bg-gray-100">
            <div className="overflow-y-auto overscroll-contain sticky top-0 p-4 max-h-screen">
              <SidebarSponsors />
              <TableOfContents tableOfContents={toc} />
            </div>
          </div>
        )}
        <div className="max-w-none prose min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
          {meta.title && (
            <PageHeader title={meta.title} description={meta.description} />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
