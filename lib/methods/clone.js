/*jslint node: true */
"use strict";

var cloneLib = require('clone');
var deepGet  = require('./get').get;

/**
 * Returns a deep clone of the provided object.
 * If a path is provided, the method will return
 * a clone of the substructure.
 *
 * @static
 * @public
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*}
 *
 * @example
 * var a = {foo: {hello: 'world'}};
 *
 * var b = deep.clone(a);
 * // b = {foo: {hello: 'world'}}
 *
 * var c = deep.clone(a,'foo');
 * // c = {hello: 'world'}
 *
 * var d = deep.clone(a,'foo.world');
 * // d = 'world'
 */
exports.clone = function deepClone (object, path) {

  if (path) {
    // rebase object using provided path
    object = deepGet(object, path);
  }

  return cloneLib(object);
};
