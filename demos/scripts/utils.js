module.exports.addClass = (node, classNames) => {
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

  if (typeof node.attrs.class !== 'string') {
    node.attrs.class = classNames;
  }

  const classes = node.attrs.class.split(' ');
  if (classes.indexOf(classNames) === -1) {
    node.attrs.class = [classNames].concat(classes).join(' ');
  }
  return node;
};

module.exports.extractConfig = (filePath, mode = 'core') => {
  const demoConfig = require(filePath)('core');
  const modules = [];
  demoConfig.config.forEach((config) => {
    Object.keys(config).forEach((name) => {
      const nameFormatted = (name.charAt(0).toUpperCase() + name.slice(1))
        .replace(/\-[a-z]/g, (match) => match.toUpperCase())
        .replace('-', '');
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
          'effect-fade',
          'effect-cube',
          'effect-flip',
          'effect-coverflow',
          'thumbs',
        ].includes(name.toLowerCase()) &&
        !modules.includes(nameFormatted)
      ) {
        modules.push(nameFormatted);
      }
    });
  });
  if (demoConfig)
    return { ...demoConfig, modules: modules.length > 0 ? modules : null };
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

module.exports.formatFn = (value) => {
  return value
    .replace(/('|")(\s+)?(function|\(\))/g, '$2$3')
    .replace(/('|")(\s+)?\}/g, '$2}')
    .replace(/\\n/g, '\n');
};
