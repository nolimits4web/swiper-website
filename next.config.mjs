import path from 'path';
import fs from 'fs';
import querystring from 'querystring';
import { createLoader } from 'simple-functional-loader';
import frontMatter from 'front-matter';
import rehypePrism from '@mapbox/rehype-prism';
import minimatch from 'minimatch';
import * as url from 'url';
import { withTableOfContents } from './withTableOfContents.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const fallbackLayouts = {
  'src/pages/**/*': ['@/layouts/withSidebar', 'WithSidebarLayout'],
};

const pkg = JSON.parse(
  fs.readFileSync('./node_modules/swiper/package.json', 'utf-8')
);

const nextConfig = {
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
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: [
    //     {
    //       loader: '@svgr/webpack',
    //       options: { svgoConfig: { plugins: { removeViewBox: false } } },
    //     },
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         publicPath: '/_next',
    //         name: 'static/media/[name].[hash].[ext]',
    //       },
    //     },
    //   ],
    // });

    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        createLoader(function (source) {
          if (source.includes('/*START_META*/')) {
            const [meta] = source.match(
              /\/\*START_META\*\/(.*?)\/\*END_META\*\//s
            );
            return `export default ${meta}`;
          }
          return `${source.replace(
            /export const/gs,
            'const'
          )}\nMDXContent.layoutProps = layoutProps\n`;
        }),
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [withTableOfContents],
            rehypePlugins: [rehypePrism],
          },
        },
        createLoader(function (source) {
          const { meta: fields } = querystring.parse(
            this.resourceQuery.substr(1)
          );
          const { attributes: meta, body } = frontMatter(source);
          if (fields) {
            for (const field in meta) {
              if (!fields.split(',').includes(field)) {
                delete meta[field];
              }
            }
          }

          const extra = [];
          const resourcePath = path.relative(__dirname, this.resourcePath);

          if (!/^\s*export\s+(var|let|const)\s+Layout\s+=/m.test(source)) {
            for (const glob in fallbackLayouts) {
              if (minimatch(resourcePath, glob)) {
                extra.push(
                  `import { ${fallbackLayouts[glob][1]} as _Layout } from '${fallbackLayouts[glob][0]}'`,
                  'export const Layout = _Layout'
                );
                break;
              }
            }
          }

          if (
            !/^\s*export\s+default\s+/m.test(
              source.replace(/```(.*?)```/gs, '')
            )
          ) {
            for (const glob in fallbackLayouts) {
              if (minimatch(resourcePath, glob)) {
                extra.push(
                  `import { ${fallbackLayouts[glob][1]} as _Default } from '${fallbackLayouts[glob][0]}'`,
                  'export default _Default'
                );
                break;
              }
            }
          }

          return [
            ...(typeof fields === 'undefined' ? extra : []),
            typeof fields === 'undefined' ? body : '',
            typeof fields === 'undefined'
              ? `export const meta = ${JSON.stringify(meta)}`
              : `export const meta = /*START_META*/${JSON.stringify(
                  meta || {}
                )}/*END_META*/`,
          ].join('\n\n');
        }),
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
};
export default nextConfig;
