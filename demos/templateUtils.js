export const cssVariables = (mode = 'static', vars = {}) => {
  // {{'--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff'}}
  let res = '';
  if (mode === 'static' || mode === 'angular') {
    Object.keys(vars).forEach((key) => {
      res += `${key}: ${vars[key]};`;
    });
    return `style="${res}"`;
  }
  Object.keys(vars).forEach((key) => {
    res += `'${key}': '${vars[key]}',`;
  });
  return `style={{${res}}}`;
};
