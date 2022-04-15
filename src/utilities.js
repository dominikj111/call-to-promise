'use strict';

/**
 * Function tests if the passed value is a string.
 *
 * @param {*} value Parameter to check
 * @returns {boolean} It returns true if the parameter is a string
 */
function isString (value) {
  return typeof value === 'string';
}

/**
 * Function tests if the passed value is an array of strings.
 *
 * @param {*} value Possible array of strings
 * @returns {boolean} It returns true if the parameter is an array of strings
 */
function isArrayOfStrings (value) {
  return Array.isArray(value) && value.every(isString);
}

exports.isString = isString;
exports.isArrayOfStrings = isArrayOfStrings;
