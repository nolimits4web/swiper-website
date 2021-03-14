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

function formatName(name) {
  return (name.charAt(0).toUpperCase() + name.slice(1))
    .replace(/\-[a-z]/g, (match) => match.toUpperCase())
    .replace('-', '');
}

module.exports.extractConfig = (configObj, mode = 'static') => {
  let demoConfig;
  try {
    demoConfig = configObj(mode);
  } catch (err) {
    console.warn(err);
    return null;
  }
  if (demoConfig.skip) {
    console.log(`Skipping: ${demoConfig.title} ${mode}.. `);
    return null;
  }
  const modules = [];
  demoConfig.config.forEach((config) => {
    Object.keys(config).forEach((name) => {
      if (name === 'effect') {
        const effectModuleName = formatName(`${name}-${config[name]}`);
        if (!modules.includes(effectModuleName)) {
          modules.push(effectModuleName);
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
    .replace(/('|")(\s+)?(\()(function|\(\))/g, '$2$3$4')
    .replace(/(function.*\})(\s+)?('|")/g, '$1$2')
    .replace(/}\)\(\)"/g, '})()')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\n');
};

module.exports.cleanupConfig = (configs) => {
  const isArray = Array.isArray(configs);
  const _configs = !isArray ? [configs] : configs;
  const res = _configs.map((config) => {
    if (config.__el) {
      delete config.__el;
    }
    return config;
  });
  return isArray ? res : res[0];
};
