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
    const demoConfig = extractConfig(_config, 'react');
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
      renderPostHTML(config, vars, configReverseOrder),
    ]).process(content, {
      closingSingleTag: 'slash',
    });
    const templateString = aferPostHTML(html);
    // const componentContent = prettier.format(
    //   render({ templateString, vars }, demoConfig),
    //   {
    //     parser: 'babel',
    //   }
    // );
    const componentContent = render({ templateString, vars }, demoConfig);
    await fs.writeFile(
      path.join(dir, 'react.json'),
      JSON.stringify({
        'src/App.js': { content: componentContent },
        'src/styles.css': {
          content: `#root { height: 100% }\n${globalStyles}\n${styles}`,
        },
      })
    );
  } catch (err) {
    throw new Error('React: ' + err.stack);
  }
};

function aferPostHTML(html) {
  return html
    .replace(/=("|'){([^}]*)}("|')/g, '={$2}')
    .replace(/=("|'){{([^}]*)}}("|')/g, '={{$2}}')
    .replace(/=("|'){{/g, '={{')
    .replace(/}}("|')/g, '}}');
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
  const _modules = modules ? modules.join(',') : '';
  const varsTemplate = vars
    ? vars
        .map(({ key, value }) => {
          const _value = formatFn(value);
          return `const ${key} = ${_value}`;
        })
        .join('\n')
    : '';

  const isThumbs = modules && modules.includes('Thumbs');

  return `
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
${
  cssModules
    ? cssModules
        .map(
          (cssModule) =>
            `import "swiper/components/${cssModule}/${cssModule}.min.css"`
        )
        .join('\n')
    : ''
}

import "./styles.css";

${
  modules
    ? `
// import Swiper core and required modules
import SwiperCore, {
  ${_modules}
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([${_modules}]);
`
    : ''
}

export default function App() {
  ${varsTemplate}
  ${
    isThumbs
      ? `
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  `
      : ''
  }
  ${script.react || ''}
  return (
    <>
    ${templateString}
    </>
  )
}`;
}

function renderPostHTML(config, vars, reverse = false) {
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
        // node.tag = 'Swiper';
        const _config =
          config[reverse ? config.length - 1 - swiperIndex : swiperIndex];
        Object.keys(_config).forEach((key) => {
          Object.keys(node.attrs).forEach((attrName) => {
            if (attrName.startsWith('#')) {
              node.attrs['onSwiper'] = `{setSwiperRef}`;
              delete node.attrs[attrName];
            }
            if (attrName === 'thumbsSlider') {
              delete node.attrs[attrName];
              node.attrs['onSwiper'] = '{setThumbsSwiper}';
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
            node.attrs[`thumbs`] = `{{ swiper: thumbsSwiper }}`;
          } else {
            node.attrs[key] = `{${value}}`;
          }
        });
        const indexStr = getStringIndex(config, swiperIndex, reverse);
        addClass(node, `${swiperName}${indexStr}`, true);
      } else if (node.tag === 'SwiperSlide') {
        // node.tag = 'SwiperSlide';
        // node.attrs.swiperSlide = true;
      }

      return node;
    });
    return tree;
  };
}
