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
  const modules = null;
  return { ...demoConfig, modules };
};
