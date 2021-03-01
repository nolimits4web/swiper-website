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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

module.exports.extractConfig = (filePath, mode = 'core') => {
  const demoConfig = require(filePath)('core');
  const modules = [];
  demoConfig.config.forEach((config) => {
    Object.keys(config).forEach((key) => {
      const _key = capitalizeFirstLetter(key);
      if (
        ['pagination', 'navigation'].includes(_key.toLowerCase()) &&
        !modules.includes(_key)
      ) {
        modules.push(_key);
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
