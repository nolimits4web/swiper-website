const posthtml = require('posthtml');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const { extractConfig } = require('./utils');

module.exports = async (dir, filePath) => {
  const demoConfig = extractConfig(filePath, 'angular');
  const { content, config, styles, title, modules } = demoConfig;
  const { html: templateString } = await posthtml([ngPostHTML(config)]).process(
    content
  );
  const finalContent = prettier.format(
    render({ templateString, styles, modules }),
    {
      parser: 'typescript',
    }
  );
  await fs.writeFile(path.join(dir, 'angular.ts'), finalContent);
};

function render({ templateString, styles, modules }) {
  return `
import { Component } from '@angular/core';

${
  modules
    ? `// import Swiper core and required modules
import SwiperCore from 'swiper/core';`
    : ''
}

@Component({
  selector: 'app-swiper-example',
  template: \`${templateString}\`,
  styles: [\`${styles}\`]
})
export class AppComponent {
  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
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
        const _config = config[0];
        Object.keys(_config).forEach((key) => {
          // TODO: multiple configs
          let value = '';
          if (typeof _config[key] === 'object') {
            value = JSON.stringify(_config[key]);
          }
          if (!value) {
            value = _config[key];
          }
          node.attrs[`[${key}]`] = value.toString();
        });
      } else if (node.tag === 'SwiperSlide') {
        node.tag = 'ng-template';
        node.attrs.swiperSlide = true;
      }

      return node;
    });
    return tree;
  };
}
