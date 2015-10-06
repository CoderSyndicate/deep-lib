/*jslint node: true */
"use strict";

var util                 = require('util');

exports.sep              = '.';
exports.arrayPlaceholder = '*';
exports.arrayPush        = '*+';
exports.arrayPop         = '*-';

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
    case exports.arrayPop:
      return 'pop';
    default:
      return /^[0-9]+$/.test(pathElement);
  }
};

exports.pathIncludesArrayWildcards = function isArrayIndex (path) {
  return (
      path.indexOf(exports.arrayPlaceholder) > -1 ||
      path.indexOf(exports.arrayPush) > -1        ||
      path.indexOf(exports.arrayPop) > -1
  );
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
 * Retrieve the parent part of the provided path.
 *
 * @function tools.parent
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {string} path the path to be processed
 *
 * @returns {string|null} the parent path or null if no deep reference was provided
 *
 * @example
 * var deep = require('deep-lib');
 *
 * deep.tools.parent('path.to.deep.property'); // => 'path.to.deep'
 * deep.tools.parent('path.to.0.property');    // => 'path.to.0'
 * deep.tools.parent('property');              // no deep reference => null
 */
exports.parent = function parent (path) {
  var lastSepIndex = path.lastIndexOf(exports.sep);
  return (lastSepIndex > -1 ? path.substring(0, lastSepIndex) : null);
};

/**
 * Retrieve the property name from the provided path.
 *
 * @function property
 * @memberof deep-lib.tools
 * @static
 * @public
 *
 * @param {string} path the path to be processed
 *
 * @returns {string} the property name
 *
 * @example
 * var deep = require('deep-lib');
 *
 * deep.tools.property('path.to.deep.property'); // => 'property'
 * deep.tools.property('path.to.0.property');    // => 'property'
 * deep.tools.property('property');              // => 'property'
 */
exports.property = function property (path) {
  var lastSepIndex = path.lastIndexOf(exports.sep);
  return (lastSepIndex > -1 ? path.substring(lastSepIndex + 1) : path);
};
