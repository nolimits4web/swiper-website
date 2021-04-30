const posthtml = require('posthtml');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const {
  extractConfig,
  parseJSON,
  formatFn,
  cleanupConfig,
  addClass,
  swiperName,
  getStringIndex,
} = require('./_utils');

module.exports = async (dir, _config) => {
  try {
    const demoConfig = extractConfig(_config, 'angular');
    if (!demoConfig) return;
    const {
      content,
      config,
      modules,
      cssModules,
      globalStyles = '',
      styles = '',
      configReverseOrder,
    } = demoConfig;
    const { configs: parsedConfig, vars } = parseConfig(config);
    config.parsed = parsedConfig;
    const { html: templateString } = await posthtml([
      renderPostHTML(config, vars, configReverseOrder),
    ]).process(
      content
        .replace(/className\=/g, 'class=')
        .replace(/("|')swiperVar_("|')/g, 'swiper')
    );
    const componentContent = prettier.format(
      render({ templateString, modules, vars }, demoConfig),
      {
        parser: 'typescript',
      }
    );
    const componentCSS = cssModules
      ? cssModules.map((m) => `@import "~swiper/components/${m}/${m}";`)
      : [];
    await fs.writeFile(
      path.join(dir, 'angular.json'),
      JSON.stringify({
        'src/app/app.component.ts': { content: componentContent },
        'src/app/app.components.scss': {
          content:
            '\n@import "~swiper/swiper";\n' +
            componentCSS.join('\n') +
            `\n${styles}`,
        },
        'src/styles.scss': {
          content: globalStyles,
        },
      })
    );
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

function render({ templateString, modules, vars }, { script = {} }) {
  const _modules = modules ? modules.join(',') : '';
  const varsTemplate = vars
    ? vars
        .map(({ key, value }) => {
          const _value = formatFn(value);
          return `${key} = ${_value}`;
        })
        .join('\n')
    : '';

  const isThumbs = modules && modules.includes('Thumbs');

  return `
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
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
  styleUrls: ['./app.components.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  ${varsTemplate}
  ${
    isThumbs
      ? `
  thumbsSwiper: any;
  `
      : ''
  }
  ${script.angular || ''}
}

  `;
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
        node.tag = 'swiper';
        const _config =
          config[reverse ? config.length - 1 - swiperIndex : swiperIndex];
        Object.keys(_config).forEach((key) => {
          Object.keys(node.attrs).forEach((attrName) => {
            if (attrName.startsWith('#')) {
              node.attrs[attrName] = true;
            }
            if (attrName === 'thumbsSlider') {
              node.attrs[attrName] = null;
              node.attrs['(swiper)'] = 'thumbsSwiper = $event';
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
            node.attrs[`[thumbs]`] = `{ swiper: thumbsSwiper }`;
          } else {
            node.attrs[`[${key}]`] = value;
          }
        });
        const indexStr = getStringIndex(config, swiperIndex, reverse);
        addClass(node, `${swiperName}${indexStr}`);
      } else if (node.tag === 'SwiperSlide') {
        node.tag = 'ng-template';
        node.attrs.swiperSlide = true;
      }

      return node;
    });
    return tree;
  };
}
