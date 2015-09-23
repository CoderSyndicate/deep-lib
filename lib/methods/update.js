/*jslint node: true */
"use strict";

var tools      = require('../tools');
var deepGet    = require('./get').get;

/**
 *
 * @function update
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object
 * @param path
 * @param value
 */
exports.update = function update (object, path, value) {
  if (value !== undefined) {
    var propertyName = path;

    if (tools.isDeep(path)) {
      // last element of the path is the property to be assigned
      // remove it from the path elements
      propertyName = tools.property(path);

      // rebase object
      object   = deepGet(object, tools.parent(path));
    }

    if (tools.isArray(object)) {
      object[parseInt(propertyName)] = value;
    }
    else {
      object[propertyName] = value;
    }
  }
};
