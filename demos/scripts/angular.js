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

module.exports = async (dir, _config) => {
  try {
    swiperIndex = 0;
    const demoConfig = extractConfig(_config, 'angular');
    if (!demoConfig) return;
    const {
      content,
      config,
      modules,
      cssModules,
      globalStyles = '',
      styles = '',
    } = demoConfig;
    const { configs: parsedConfig, vars } = parseConfig(config);
    config.parsed = parsedConfig;
    const { html: templateString } = await posthtml([
      ngPostHTML(config, vars),
    ]).process(content.replace(/className\=/g, 'class='));
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
  ${script.angular || ''}
}

  `;
}

function ngPostHTML(config, vars) {
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
          Object.keys(node.attrs).forEach((attrName) => {
            if (attrName.startsWith('#')) {
              node.attrs[attrName] = true;
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
          node.attrs[`[${key}]`] = value;
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
