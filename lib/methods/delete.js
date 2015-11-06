/*jslint node: true */
"use strict";

var tools  = require('../tools');
var select = require('./select').select;

/**
 * Deletes the referenced property and returns its value
 *
 * @function delete
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object|array} object object into which the property will be deleted
 * @param {string} path path referencing the property to be deleted
 * @param {string} [offset] path used to rebase processing to the referenced substructure
 *
 * @returns {*|undefined} value of the deleted property or false if not found
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}, some: 'thing'};
 *
 * deep.delete(a, 'some'); // => {foo: {hello: 'world'}}
 * deep.delete(a, 'foo'); // => {some: 'thing'}
 */
exports.delete = function deepDelete (object, path, offset) {

  if (offset) {
    // rebase object using provided offset
    object = select(object, offset);
  }

  var propertyName = path;

  if (tools.isDeep(path)) {
    propertyName = tools.property(path);
    path         = tools.parent(path);
  }

  object = select(object, path);

  if (object === undefined) {
    return;
  }

  var value   = object[propertyName];

  if (tools.isArray(object)) {
    object.splice(propertyName, 1);
  }
  else {
    delete object[propertyName];
  }

  return value;
};
