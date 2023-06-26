import fs from 'fs';
import Link from 'next/link';

export default function Blog(props) {
  const { posts } = props;
  const formatDate = (d) => {
    return Intl.DateTimeFormat('en-us', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(d));
  };
  return (
    <div className="px-4 sm:px-6">
      <div className="mx-auto max-w-[940px] pb-24 pt-10  lg:pb-16">
        <h1 className="mb-[0.7em] text-[40px] font-bold leading-[1.2]">
          Swiper Blog
        </h1>
        <div className="space-y-16 md:grid md:grid-cols-2 md:gap-16 md:space-y-0">
          {posts.map((post) => (
            <Link
              href={post.path}
              key={post.title}
              style={{ gridColumn: post.featured ? '1 / span 2' : 'auto' }}
              className="group relative block rounded-3xl border border-outline-variant p-4 duration-200 hover:bg-primary-container hover:text-on-primary-container hover:no-underline active:rounded-xl"
            >
              <div className="relative overflow-hidden rounded-xl pb-[50%]">
                {post.image && (
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover object-center duration-200"
                    src={`${post.image}`}
                    alt={post.title}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="mt-4 w-fit text-xl font-bold text-on-surface group-hover:text-on-primary-container">
                {post.title}
              </div>
              <div className="mt-1 text-sm text-on-surface opacity-75">
                {formatDate(post.date)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = fs
    .readdirSync('./src/pages/blog')
    .filter((f) => f.includes('.mdx'))
    .map((f) => {
      const content = fs.readFileSync(`./src/pages/blog/${f}`, 'utf-8');
      const data = {
        path: `/blog/${f.split('.mdx')[0]}`,
        published: true,
      };
      content
        .split('export const meta = {')[1]
        .split('}')[0]
        .trim()
        .split('/n')
        .forEach((line) => {
          if (line.includes('title:')) {
            data.title = line.split(`title: '`)[1].split(`'`)[0];
          }
          if (line.includes('image:')) {
            data.image = line.split(`image: '`)[1].split(`'`)[0];
          }
          if (line.includes('date:')) {
            data.date = line.split(`date: '`)[1].split(`'`)[0];
          }
          if (line.includes('published:')) {
            data.published = !line.includes('published: false');
          }
          if (line.includes('featured: true')) {
            console.log('wtf?!');
            data.featured = true;
          }
        });
      return data;
    })
    .filter((d) => d.published);

  posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return {
    props: {
      posts,
    },
  };
}

const meta = {
  title: 'Swiper Blog',
};

Blog.layoutProps = {
  meta,
};
