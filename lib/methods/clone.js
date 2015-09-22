/*jslint node: true */
"use strict";

var cloneLib = require('clone');
var deepGet  = require('./get').get;

/**
 * Returns a deep clone of the provided object.
 * If a path is provided, the method will return
 * a clone of the substructure.
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*}
 */
exports.clone = function deepClone (object, path) {

  if (path) {
    // rebase object using provided path
    object = deepGet(object, path);
  }

  return cloneLib(object);
};
