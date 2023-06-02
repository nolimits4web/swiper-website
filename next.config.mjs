import fs from 'fs';
import rehypePrism from '@mapbox/rehype-prism';
import nextMdx from '@next/mdx';
// import { withTableOfContents } from './withTableOfContents.mjs';

const withMdx = nextMdx({
  remarkPlugins: [
    /* withTableOfContents */
  ],
  rehypePlugins: [rehypePrism],
});

const pkg = JSON.parse(
  fs.readFileSync('./node_modules/swiper/package.json', 'utf-8')
);

const nextConfig = withMdx({
  experimental: { esmExternals: true },
  images: {
    // https://stackoverflow.com/questions/68008498/nextjs-typeerror-unsupported-file-type-undefined-after-update-to-v-11
    disableStaticImages: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx'],
  env: {
    swiperReleaseVersion: pkg.version,
    swiperReleaseDate: pkg.releaseDate,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      // use: ['@svgr/webpack'],
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
            removeViewBox: false,
            svgoConfig: {
              removeDimensions: true,
              removeViewBox: false,
            },
          },
        },
      ],
    });
    return config;
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
