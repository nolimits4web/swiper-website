const prettier = require('prettier');

module.exports.addClass = (node, classNames, jsx = false) => {
  if (!classNames) {
    return node;
  }
  if (!node.attrs) {
    node.attrs = { class: classNames };
  }

  if (node.attrs.tag) {
    node.tag = node.attrs.tag;
    delete node.attrs.tag;
  }
  const classKey = jsx ? 'className' : 'class';

  if (typeof node.attrs[classKey] !== 'string') {
    node.attrs[classKey] = classNames;
  }

  if (node.attrs[classKey] === classNames) {
    return node;
  }

  const classes = node.attrs[classKey].split(' ');
  if (classes.indexOf(classNames) === -1) {
    node.attrs[classKey] = [classNames].concat(classes).join(' ');
  }
  return node;
};

function formatName(name) {
  return (name.charAt(0).toUpperCase() + name.slice(1))
    .replace(/\-[a-z]/g, (match) => match.toUpperCase())
    .replace('-', '');
}

function camelCaseToDash(myStr) {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

module.exports.extractConfig = (configObj, mode = 'core') => {
  let demoConfig;
  try {
    demoConfig = configObj(mode);
  } catch (err) {
    console.warn(err);
    return null;
  }
  if (demoConfig.skip) {
    return null;
  }
  const modules = [];
  const cssModules = [];
  demoConfig.config.forEach((config) => {
    Object.keys(config).forEach((name) => {
      if (name === 'effect') {
        const effectModuleName = formatName(`${name}-${config[name]}`);
        if (!modules.includes(effectModuleName)) {
          modules.push(effectModuleName);
          cssModules.push(camelCaseToDash(effectModuleName));
        }
      }
      const nameFormatted = formatName(name);
      if (
        [
          'virtual',
          'keyboard',
          'mousewheel',
          'navigation',
          'pagination',
          'scrollbar',
          'parallax',
          'zoom',
          'lazy',
          'controller',
          'a11y',
          'history',
          'hash-navigation',
          'autoplay',
          'thumbs',
        ].includes(name.toLowerCase()) &&
        !modules.includes(nameFormatted)
      ) {
        modules.push(nameFormatted);
        if (
          ![
            'virtual',
            'keyboard',
            'mousewheel',
            'parallax',
            'a11y',
            'history',
            'hash-navigation',
            'autoplay',
          ].includes(name.toLowerCase())
        ) {
          cssModules.push(camelCaseToDash(nameFormatted));
        }
      }
    });
  });
  demoConfig.styles = demoConfig.styles
    ? prettier.format(demoConfig.styles, {
        parser: 'scss',
      })
    : '';
  demoConfig.globalStyles = demoConfig.globalStyles
    ? prettier.format(demoConfig.globalStyles, {
        parser: 'scss',
      })
    : '';
  if (demoConfig)
    return {
      ...demoConfig,
      modules: modules.length > 0 ? modules : null,
      cssModules: cssModules.length > 0 ? cssModules : null,
    };
};

module.exports.parseJSON = (value) => {
  return JSON.stringify(
    value,
    (key, val) => {
      return typeof val === 'function' ? val.toString() : val;
    },
    2
  );
};

module.exports.getStringIndex = (config, index, reverse = false) => {
  const count = config.length - 1;
  if (reverse) {
    if (index === 0) {
      return count + 1;
    }
    if (index === count) {
      return '';
    }
    return count - index + 1;
  }
  if (index === 0) {
    return '';
  }
  return index + 1;
};

module.exports.formatFn = (value) => {
  return value
    .replace(/('|")(\s+)?(function|\(\))/g, '$2$3')
    .replace(/('|")(\s+)?(\()(function|\(\))/g, '$2$3$4')
    .replace(/(function.*\})(\s+)?('|")/g, '$1$2')
    .replace(/}\)\(\)"/g, '})()')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\n');
};

module.exports.swiperName = 'mySwiper';

module.exports.cleanupConfig = (configs) => {
  // const isArray = Array.isArray(configs);
  // const _configs = !isArray ? [configs] : configs;
  // const res = _configs.map((config) => {
  //   return config;
  // });
  // return isArray ? res : res[0];
  return configs;
};
