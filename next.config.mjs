import fs from 'fs';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeSlug from 'rehype-slug';
import nextMdx from '@next/mdx';

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypePrism],
    providerImportSource: '@mdx-js/react',
  },
});

const pkg = JSON.parse(
  fs.readFileSync('./node_modules/swiper/package.json', 'utf-8')
);

const nextConfig = withMdx({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'export',
  distDir: 'out',
  env: {
    swiperReleaseVersion: pkg.version,
    swiperReleaseDate: pkg.releaseDate,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
export default nextConfig;
