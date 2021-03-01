const posthtml = require('posthtml');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const {
  extractConfig,
  parseJSON,
  formatFn,
  cleanupConfig,
} = require('./utils');
let swiperIndex = 0;

module.exports = async (dir, filePath) => {
  try {
    swiperIndex = 0;
    const demoConfig = extractConfig(filePath, 'angular');
    const {
      content,
      config,
      styles,
      title,
      globalStyles,
      modules,
    } = demoConfig;
    const { configs: parsedConfig, vars } = parseConfig(config);
    config.parsed = parsedConfig;
    const { html: templateString } = await posthtml([
      ngPostHTML(config),
    ]).process(content);
    const finalContent = prettier.format(
      render({ templateString, styles, modules, vars, globalStyles }),
      {
        parser: 'typescript',
      }
    );
    await fs.writeFile(path.join(dir, 'angular.ts'), finalContent);
  } catch (err) {
    throw new Error('Angular: ' + err.stack);
  }
};

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

function render({ templateString, globalStyles, styles, modules, vars }) {
  const _modules = modules ? modules.join(',') : '';
  const varsTemplate = vars
    ? vars
        .map(({ key, value }) => {
          const _value = formatFn(value);
          return `${key} = ${_value}`;
        })
        .join('\n')
    : '';
  return `
import { Component, ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'app-swiper-example',
  template: \`${templateString}\`,
  styles: [\`${globalStyles}

  ${styles}\`],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  ${varsTemplate}
}

  `;
}

function ngPostHTML(config) {
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
        node.tag = 'swiper';
        const _config = config.parsed[swiperIndex];
        Object.keys(_config).forEach((key) => {
          node.attrs[`[${key}]`] = _config[key];
        });
        swiperIndex++;
      } else if (node.tag === 'SwiperSlide') {
        node.tag = 'ng-template';
        node.attrs.swiperSlide = true;
      }

      return node;
    });
    return tree;
  };
}
