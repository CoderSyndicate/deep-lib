/*jslint node: true */
"use strict";

var cloneLib = require('clone');
var deepGet  = require('./get').get;

/**
 * Returns a deep clone of the provided object.
 * If a path is provided, the method will return
 * a clone of the referenced substructure, property value or undefined
 * should the path be unknown.
 *
 * @function clone
 * @inner
 * @public
 *
 * @param {object} object source object
 * @param {string} [path] path pointing to a value or a structure
 *
 * @returns {*|undefined} a structure, a value or undefined
 *
 * @example
 * var a = {foo: {hello: 'world'}};
 *
 * var b = deep.clone(a); // => {foo: {hello: 'world'}}
 *
 * var c = deep.clone(a,'foo'); // => {hello: 'world'}
 *
 * var d = deep.clone(a,'foo.world'); // => 'world'
 */
exports.clone = function deepClone (object, path) {

  if (path) {
    // rebase object using provided path
    object = deepGet(object, path);
  }

  return cloneLib(object);
};
