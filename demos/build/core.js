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
  swiperName,
  getStringIndex,
} = require('./_utils');

module.exports = async (dir, _config) => {
  try {
    const demoConfig = extractConfig(_config, 'core');
    if (!demoConfig) return;
    const { content, config, configReverseOrder } = demoConfig;
    const { html: templateString } = await posthtml([
      renderPostHTML(config, configReverseOrder),
    ]).process(content.replace(/className\=/g, 'class='));

    const finalContent = prettier.format(
      render({ templateString, config }, demoConfig),
      {
        parser: 'html',
      }
    );
    await fs.writeFile(path.join(dir, 'core.html'), finalContent);
  } catch (err) {
    throw new Error('core: ' + err.stack);
  }
};

function render(
  { templateString, config },
  { styles = '', globalStyles = '', script = {} }
) {
  let configJSCode = '';
  config.forEach((_config, index) => {
    const tempConfig = _config;
    if (tempConfig.navigation) {
      tempConfig.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        ...tempConfig.navigation,
      };
    }
    if (tempConfig.scrollbar) {
      tempConfig.scrollbar = {
        el: '.swiper-scrollbar',
        ...tempConfig.scrollbar,
      };
    }
    if (tempConfig.pagination) {
      tempConfig.pagination = {
        el: '.swiper-pagination',
        ...tempConfig.pagination,
      };
    }
    const finalConfig = tempConfig
      ? formatFn(parseJSON(cleanupConfig(tempConfig))).replace(
          /("|')swiperVar_("|')/g,
          'swiper'
        )
      : null;
    const indexStr = index === 0 ? '' : `${index + 1}`;
    const el = `.${swiperName}${indexStr}`;
    configJSCode += `\nvar swiper${indexStr} = new Swiper('${el}'${
      finalConfig ? `, ${finalConfig}` : ''
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

      ${script.core || ''}
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

function renderPostHTML(config, reverse = false) {
  let swiperIndex = -1;
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
        swiperIndex++;
        const _config =
          config[reverse ? config.length - 1 - swiperIndex : swiperIndex];
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

        const indexStr = getStringIndex(config, swiperIndex, reverse);

        classNames = `swiper-container ${swiperName}${indexStr}`;
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
