module.exports.inlineStyles = (mode = 'static', vars = {}) => {
  if (mode === 'vue') {
    // {'--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff'}
    return `:style="{${Object.keys(vars)
      .map((key) => `'${key}': '${vars[key]}'`)
      .join(',')}}"`;
  }

  if (mode === 'react') {
    // {{'--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff'}}
    return `style="{{${Object.keys(vars)
      .map((key) => `'${key}': '${vars[key]}'`)
      .join(',')}}}"`;
  }

  // if (mode === 'static' || mode === 'angular') {
  return `style="${Object.keys(vars)
    .map((key) => `${key}: ${vars[key]}`)
    .join(';')}"`;
  // }
};
