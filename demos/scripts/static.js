const posthtml = require('posthtml');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const {
  addClass,
  extractConfig,
  parseJSON,
  formatFn,
  cleanupConfig,
} = require('./utils');

module.exports = async (dir, _config) => {
  try {
    const demoConfig = extractConfig(_config, 'static');
    if (!demoConfig) return;
    const { content, config } = demoConfig;
    const { html: templateString } = await posthtml([
      staticPostHTML(config),
    ]).process(content.replace(/className\=/g, 'class='));

    const finalContent = prettier.format(
      render({ templateString, config }, demoConfig),
      {
        parser: 'html',
      }
    );
    await fs.writeFile(path.join(dir, 'static.html'), finalContent);
  } catch (err) {
    throw new Error('Static: ' + err.stack);
  }
};

function render(
  { templateString, config },
  { styles = '', globalStyles = '', script = {} }
) {
  let configJSCode = '';
  config.forEach((_config) => {
    const finalConfig = _config;
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
    const el = finalConfig.__el || '.swiper-container';
    configJSCode += `\nvar swiper = new Swiper('${el}'${
      finalConfig ? `, ${formatFn(parseJSON(cleanupConfig(finalConfig)))}` : ''
    });`;
  });

  return `<!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="utf-8">
    <title>Swiper demo</title>
    <!-- Link Swiper's CSS -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">

    ${
      styles || globalStyles
        ? `
    <!-- Demo styles -->
    <style>
      ${globalStyles}

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
      ${configJSCode}

      ${script.static || ''}
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
        !['swiper', 'swiperslide'].includes(node.tag.toLowerCase())
      ) {
        return node;
      }
      let classNames = null;

      if (node.tag === 'Swiper') {
        const _config = config[0]; // TODO: support multiple configs
        const append = [];
        const prepend = [];
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
        if (node.content) {
          node.content = node.content.filter((item) => {
            if (item.attrs && item.attrs.slot) {
              const slot = item.attrs.slot;
              item.attrs.slot = false;
              if (slot.includes('container')) {
                if (slot === 'container-start') {
                  prepend.push(item);
                } else {
                  append.push(item);
                }
                return false;
              }
            }
            return true;
          });
        }

        classNames = 'swiper-container';
        node.content = [
          ...prepend,
          {
            tag: 'div',
            attrs: {
              class: 'swiper-wrapper',
            },
            content: node.content ? [...node.content] : [],
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
