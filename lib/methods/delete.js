/*jslint node: true */
"use strict";

var tools      = require('../tools');
var deepGet    = require('./get').get;

/**
 * Deletes the referenced property and returns
 * its value
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*|undefined} value of the deleted property or false if not found
 */
exports.delete = function deepDelete (object, path) {
  var pathElements = tools.split(path);
  var propertyName = path;

  if (pathElements.length > 1) {
    propertyName = pathElements.pop();
    path         = tools.join(pathElements);
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
