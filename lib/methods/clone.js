/*jslint node: true */
"use strict";

var cloneLib = require('clone');
var select   = require('./select').select;

/**
 * Returns a deep clone of the provided object.
 * If a `offset` is provided, the method will return
 * a clone of the referenced substructure, property value or undefined
 * should the path be unknown.
 *
 * @function clone
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object} object object to be cloned
 * @param {string} [offset] path used to rebase processing to the referenced substructure
 *
 * @returns {*|undefined} a structure, a value or undefined
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}};
 *
 * var b    = deep.clone(a);             // => {foo: {hello: 'world'}}
 * var c    = deep.clone(a,'foo');       // => {hello: 'world'}
 * var d    = deep.clone(a,'foo.world'); // => 'world'
 */
exports.clone = function deepClone (object, offset) {

  if (offset) {
    // rebase object using provided offset
    object = select(object, offset);
  }

  return cloneLib(object);
};
