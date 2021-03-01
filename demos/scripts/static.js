const posthtml = require('posthtml');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const { addClass, extractConfig, parseJSON, formatFn } = require('./utils');

module.exports = async (dir, filePath) => {
  try {
    const demoConfig = extractConfig(filePath, 'core');
    const { content, config, styles, title } = demoConfig;
    const { html: templateString } = await posthtml([
      staticPostHTML(config),
    ]).process(content);

    const finalContent = prettier.format(
      render({ templateString, styles, config }),
      {
        parser: 'html',
      }
    );
    await fs.writeFile(path.join(dir, 'static.html'), finalContent);
  } catch (err) {
    throw new Error('Static: ' + err);
  }
};

function render({ templateString, styles, config }) {
  const finalConfig = config[0]; // TODO: support multiple configs
  if (finalConfig.navigation) {
    finalConfig.navigation = {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      ...finalConfig.navigation,
    };
  }
  if (finalConfig.scrollbar) {
    finalConfig.scrollbar = {
      el: '.swiper-scrollbar',
      ...finalConfig.scrollbar,
    };
  }
  if (finalConfig.pagination) {
    finalConfig.pagination = {
      el: '.swiper-pagination',
      ...finalConfig.pagination,
    };
  }
  return `<!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="utf-8">
    <title>Swiper demo</title>
    <!-- Link Swiper's CSS -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">

    ${
      styles
        ? `
    <!-- Demo styles -->
    <style>
      ${styles}
    </style>`
        : ''
    }
  </head>

  <body>
    <!-- Swiper -->
    ${templateString}

    <!-- Swiper JS -->
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

    <!-- Initialize Swiper -->
    <script>
      var swiper = new Swiper('.swiper-container'${
        finalConfig ? `, ${formatFn(parseJSON(finalConfig))}` : ''
      });
    </script>
  </body>

  </html>
  `;
}

function divEl(classNames) {
  return {
    tag: 'div',
    attrs: {
      class: classNames,
    },
    content: '',
  };
}

function staticPostHTML(config) {
  return (tree) => {
    tree.walk((node) => {
      if (
        !node.tag ||
        ['Swiper', 'SwiperSlide'].indexOf(node.tag.toLowerCase()) !== -1
      ) {
        return node;
      }
      let classNames = null;

      if (node.tag === 'Swiper') {
        const _config = config[0]; // TODO: support multiple configs
        const append = [];
        if (_config.navigation) {
          append.push(divEl('swiper-button-next'));
          append.push(divEl('swiper-button-prev'));
        }

        if (_config.scrollbar) {
          append.push(divEl('swiper-scrollbar'));
        }

        if (_config.pagination) {
          append.push(divEl('swiper-pagination'));
        }

        classNames = 'swiper-container';
        node.content = [
          {
            tag: 'div',
            attrs: {
              class: 'swiper-wrapper',
            },
            content: [...node.content],
          },
          ...append,
        ];
      } else if (node.tag === 'SwiperSlide') {
        classNames = 'swiper-slide';
      }
      node.tag = 'div';

      addClass(node, classNames);

      return node;
    });
    return tree;
  };
}