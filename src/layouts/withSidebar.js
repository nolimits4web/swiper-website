import PageHeader from '@/components/PageHeader';
import TableOfContents from '@/components/TableOfContents';
import SidebarSponsors from '@/components/SidebarSponsors';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Carbon from '@/components/Carbon';

export function WithSidebarLayout({
  children,
  meta = {},
  classes,
  tableOfContents = [],
}) {
  let forceSidebar;
  if (
    meta.title &&
    (meta.title.includes('Swiper Angular') ||
      meta.title.includes('Swiper Solid') ||
      meta.title.includes('Swiper Svelte'))
  ) {
    forceSidebar = true;
  }
  const router = useRouter();
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
        className="mx-auto flex w-full max-w-[90rem] px-4 sm:px-6 lg:px-8 xl:px-10"
      >
        {(toc.length > 0 || forceSidebar) && (
          <div className="mr-4 hidden w-64 flex-none text-sm sm:mr-6 lg:mr-8 lg:block xl:mr-10">
            <div className="sticky top-20 max-h-screen overflow-y-auto overscroll-contain py-10">
              <SidebarSponsors />
              {toc.length > 0 && <TableOfContents tableOfContents={toc} />}
            </div>
          </div>
        )}
        <div className="prose min-w-0 max-w-none flex-auto pt-10 pb-24 dark:prose-dark lg:pb-16">
          {meta.carbon && <Carbon />}
          {meta.title && (
            <PageHeader title={meta.title} description={meta.description} />
          )}
          {children}
          <div className="mt-4 text-right">
            <Link
              href={`https://github.com/nolimits4web/swiper-website/edit/master/src/pages${router.pathname}.mdx`}
            >
              <a>Edit this page on GitHub</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
