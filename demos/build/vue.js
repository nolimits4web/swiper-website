const posthtml = require('posthtml');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const {
  extractConfig,
  parseJSON,
  formatFn,
  cleanupConfig,
  getStringIndex,
  swiperName,
  addClass,
} = require('./_utils');

module.exports = async (dir, _config) => {
  try {
    const demoConfig = extractConfig(_config, 'vue');
    if (!demoConfig) return;
    const {
      content,
      config,
      globalStyles = '',
      styles = '',
      configReverseOrder,
    } = demoConfig;
    const { configs: parsedConfig, vars } = parseConfig(config);
    config.parsed = parsedConfig;
    const { html } = await posthtml([
      renderPostHTML(config, vars, demoConfig),
    ]).process(
      content
        .replace(/className\=/g, 'class=')
        .replace(/("|')swiperVar_("|')/g, 'swiper'),
      {
        closingSingleTag: 'slash',
      }
    );
    const templateString = aferPostHTML(html);
    const componentContent = prettier.format(
      render({ templateString, vars }, demoConfig),
      { filepath: 'swiper-demo.vue' }
    );

    await fs.writeFile(
      path.join(dir, 'vue.json'),
      JSON.stringify({
        'src/App.vue': {
          content: componentContent,
        },
        'src/style.css': {
          content: `#app { height: 100% }\n${globalStyles}\n${styles}`,
        },
      })
    );
  } catch (err) {
    throw new Error('Vue: ' + err.stack);
  }
};

function aferPostHTML(html) {
  return html.replace(/&quot;/g, "'");
}

function parseConfig(configs) {
  const vars = [];
  const _configs = cleanupConfig(configs).map((config) => {
    Object.keys(config).forEach((key) => {
      let value = config[key].toString();
      if (typeof config[key] === 'object') {
        value = parseJSON(config[key]);
      }
      if (value && (value.includes('function') || value.includes('=>'))) {
        vars.push({
          key,
          value,
        });
        value = key;
      }
      config[key] = value.toString();
    });
    return config;
  });
  return { configs: _configs, vars };
}

function render(
  { templateString, vars },
  { script = {}, cssModules, modules }
) {
  const modulesListComa = modules?.join(',');
  const varsTemplate = vars
    ? vars
        .map(({ key, value }) => {
          const _value = formatFn(value);
          return `${key}: ${_value}`;
        })
        .join('\n')
    : '';

  const isThumbs = modules?.includes('Thumbs');

  return `
<template>
${templateString}
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

${
  cssModules
    ? cssModules
        .map((cssModule) => `import "swiper/css/${cssModule}"`)
        .join('\n')
    : ''
}

import './style.css';

${
  modulesListComa
    ? `
// import required modules
import {${modulesListComa}} from 'swiper';
`
    : ''
}

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    ${isThumbs ? `let thumbsSwiper = null;` : ''}
    ${
      isThumbs
        ? `
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper = swiper;
    },`
        : ''
    }
    ${script.vue || ''}
    return {
      ${varsTemplate ? `${varsTemplate},` : ''}
      ${modulesListComa ? `modules: [${modulesListComa}],` : ''}
    };
  }
}
</script>`;
}

function renderPostHTML(config, vars, params) {
  const { configReverseOrder: reverse = false, modules } = params;
  let swiperIndex = -1;
  return (tree) => {
    tree.walk((node) => {
      if (
        !node.tag ||
        ['Swiper', 'SwiperSlide'].indexOf(node.tag.toLowerCase()) !== -1
      ) {
        return node;
      }
      node.attrs = node.attrs || {};
      if (node.tag === 'Swiper') {
        swiperIndex++;
        node.tag = 'swiper';
        const _config =
          config[reverse ? config.length - 1 - swiperIndex : swiperIndex];
        Object.keys(_config).forEach((key) => {
          Object.keys(node.attrs).forEach((attrName) => {
            if (attrName.startsWith('#')) {
              node.attrs['ref'] = `{${attrName.replace('#', '')}}`;
              delete node.attrs[attrName];
            }
            if (attrName === 'thumbsSlider') {
              delete node.attrs[attrName];
              node.attrs['@swiper'] = 'setThumbsSwiper';
            }
          });
          let value = _config[key];
          const _vars = vars.map((v) => v.key);
          if (
            !(
              /[\{\}]/g.test(value) ||
              value === 'true' ||
              value === 'false' ||
              !isNaN(value) ||
              _vars.includes(value)
            )
          ) {
            value = `'${_config[key]}'`;
          }
          if (key === 'thumbs') {
            node.attrs[`:thumbs`] = `{ swiper: thumbsSwiper }`;
          } else {
            node.attrs[`:${key}`] = `${value}`;
          }
        });
        const indexStr = getStringIndex(config, swiperIndex, reverse);
        if (modules) {
          node.attrs[':modules'] = `modules`;
        }
        addClass(node, `${swiperName}${indexStr}`);
      } else if (node.tag === 'SwiperSlide') {
        node.tag = 'swiper-slide';
      }

      return node;
    });
    return tree;
  };
}
