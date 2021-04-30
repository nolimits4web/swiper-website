module.exports.inlineStyles = (mode = 'core', vars = {}) => {
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

  // if (mode === 'core' || mode === 'angular') {
  return `style="${Object.keys(vars)
    .map((key) => `${key}: ${vars[key]}`)
    .join(';')}"`;
  // }
};
