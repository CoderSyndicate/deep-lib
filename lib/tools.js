/*jslint node: true */
"use strict";

var util                 = require('util');

exports.sep              = '.';
exports.arrayPlaceholder = '*';
exports.arrayPush        = '*+';
exports.arrayUnshift     = '+*';

/**
 *
 * @function split
 * @static
 * @private
 *
 * @param path
 * @returns {Array}
 */
exports.split = function split (path) {
  return (path ? path.split(exports.sep) : []);
};

exports.join = function join (pathElements) {
  return pathElements.join(exports.sep);
};

exports.isArrayIndex = function isArrayIndex (pathElement) {
  switch (pathElement) {
    case exports.arrayPlaceholder:
    case exports.arrayPush:
      return 'push';
    case exports.arrayUnshift:
      return 'unshift';
    default:
      return /^[0-9]+$/.test(pathElement);
  }
};

exports.isObject = function isArrayIndex (pathElement) {
  return (typeof pathElement === 'object' && pathElement !== null);
};

exports.isArray = function isArray (object) {
  return Object.prototype.toString.call(object) === "[object Array]";
};

exports.areIdentical = function areIdentical (object1, object2) {
  return object1 === object2;
};

exports.isDeep = function isDeep (path) {
  var lastSepIndex = path.lastIndexOf(exports.sep);
  return (lastSepIndex > -1);
};

/**
 *
 * @function tools.parent
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param path
 * @returns {*}
 */
exports.parent = function parent (path) {
  var lastSepIndex = path.lastIndexOf(exports.sep);
  return (lastSepIndex > -1 ? path.substring(0, lastSepIndex) : path);
};

/**
 *
 * @function property
 * @memberof deep-lib.tools
 * @static
 * @public
 *
 * @param path
 * @returns {*}
 */
exports.property = function property (path) {
  var lastSepIndex = path.lastIndexOf(exports.sep);
  return (lastSepIndex > -1 ? path.substring(lastSepIndex + 1) : path);
};
