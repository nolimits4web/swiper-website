module.exports.inlineStyles = (mode = 'static', vars = {}) => {
  // {{'--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff'}}
  if (mode === 'static' || mode === 'angular') {
    return `style="${Object.keys(vars)
      .map((key) => `${key}: ${vars[key]}`)
      .join(';')}"`;
  }

  return `style="{{${Object.keys(vars)
    .map((key) => `'${key}': '${vars[key]}'`)
    .join(',')}}}"`;
};
