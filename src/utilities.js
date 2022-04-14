'use strict';

var i;

function isStringType (value) {
  return typeof value === 'string';
}

function isArrayLikeOfStrings (value) {
  if (typeof value.length === 'undefined') {
    return false;
  }

  if (typeof value === 'string') {
    return false;
  }

  for (i = 0; i < value.length; i++) {
    if (typeof value[i] !== 'string') {
      return false;
    }
  }

  return true;
}

function isArrayOfStrings (value) {
  return isArrayLikeOfStrings(value) && Boolean(value.map);
}

exports.isString = isStringType;
exports.isNotString = function (v) {
  return !isStringType(v);
};

exports.isArrayLikeOfStrings = isArrayLikeOfStrings;
exports.isNotArrayLikeOfStrings = function (v) {
  return !isArrayLikeOfStrings(v);
};

exports.isArrayOfStrings = isArrayOfStrings;
exports.isNotArrayOfStrings = function (v) {
  return !isArrayOfStrings(v);
};
