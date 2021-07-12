const path = require('path');
const querystring = require('querystring');
const { createLoader } = require('simple-functional-loader');
const frontMatter = require('front-matter');
const rehypePrism = require('@mapbox/rehype-prism');
const { withTableOfContents } = require('./withTableOfContents');
const minimatch = require('minimatch');
const pkg = require('./package.json');
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['atropos']);

const fallbackLayouts = {
  'src/pages/**/*': ['@/layouts/withSidebar', 'WithSidebarLayout'],
};

const nextConfig = {
  webpack5: true,
  images: {
    // https://stackoverflow.com/questions/68008498/nextjs-typeerror-unsupported-file-type-undefined-after-update-to-v-11
    disableStaticImages: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx'],
  target: 'serverless',
  env: {
    swiperReleaseVersion: pkg.releaseVersion,
    swiperReleaseDate: pkg.releaseDate,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgoConfig: { plugins: { removeViewBox: false } } },
        },
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        createLoader(function (source) {
          if (source.includes('/*START_META*/')) {
            const [meta] = source.match(
              /\/\*START_META\*\/(.*?)\/\*END_META\*\//s
            );
            return 'export default ' + meta;
          }
          return (
            source.replace(/export const/gs, 'const') +
            `\nMDXContent.layoutProps = layoutProps\n`
          );
        }),
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [withTableOfContents],
            rehypePlugins: [rehypePrism],
          },
        },
        createLoader(function (source) {
          let { meta: fields } = querystring.parse(
            this.resourceQuery.substr(1)
          );
          let { attributes: meta, body } = frontMatter(source);
          if (fields) {
            for (let field in meta) {
              if (!fields.split(',').includes(field)) {
                delete meta[field];
              }
            }
          }

          let extra = [];
          let resourcePath = path.relative(__dirname, this.resourcePath);

          if (!/^\s*export\s+(var|let|const)\s+Layout\s+=/m.test(source)) {
            for (let glob in fallbackLayouts) {
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
            for (let glob in fallbackLayouts) {
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
module.exports = withPlugins([bundleAnalyzer, withTM], nextConfig);
