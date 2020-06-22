"use strict";

exports.__esModule = true;
exports.getChangedParams = getChangedParams;

var _paramsList = require("./params-list");

function getChangedParams(swiperParams, oldParams, children, oldChildren) {
  var keys = [];
  if (!oldParams) return keys;
  var oldChildrenKeys = oldChildren.map(function (child) {
    return child.key;
  });
  var childrenKeys = children.map(function (child) {
    return child.key;
  });
  if (oldChildrenKeys.join('') !== childrenKeys.join('')) keys.push('children');
  if (oldChildren.length !== children.length) keys.push('children');

  var watchParams = _paramsList.paramsList.filter(function (key) {
    return key[0] === '_';
  }).map(function (key) {
    return key.replace(/_/, '');
  });

  watchParams.forEach(function (key) {
    if (key in swiperParams && key in oldParams && swiperParams[key] !== oldParams[key]) {
      keys.push(key);
    }
  });
  return keys;
}