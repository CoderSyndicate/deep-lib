/*jslint node: true */
"use strict";

var tools      = require('../tools');
var deepGet    = require('./get').get;

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
 *
 * @returns {*|undefined} value of the deleted property or false if not found
 */
exports.delete = function deepDelete (object, path) {
  var propertyName = path;

  if (tools.isDeep(path)) {
    propertyName = tools.property(path);
    path         = tools.parent(path);
  }

  object = deepGet(object, path);

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
