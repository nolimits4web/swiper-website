import fs from 'fs';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeSlug from 'rehype-slug';
import nextMdx from '@next/mdx';

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug, rehypePrism],
    providerImportSource: '@mdx-js/react',
  },
});

const pkg = JSON.parse(
  fs.readFileSync('./node_modules/swiper/package.json', 'utf-8')
);

const nextConfig = withMdx({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  env: {
    swiperReleaseVersion: pkg.version,
    swiperReleaseDate: pkg.releaseDate,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/api',
        destination: '/swiper-api',
        permanent: true,
      },
      {
        source: '/types',
        destination: '/types/index.html',
        permanent: true,
      },
    ];
  },
});
export default nextConfig;
