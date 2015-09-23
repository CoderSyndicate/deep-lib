/*jslint node: true */
"use strict";

var tools    = require('../tools');

/**
 *
 * @function createPath
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object
 * @param path
 * @returns {Array}
 */
exports.getPaths = function getPaths (object, path) {
  var properties = [];

  Object.getOwnPropertyNames(object).forEach(function propertyIterator(property) {

    if (tools.isArray(object) && !tools.isArrayIndex(property)) {
      // array properties that are not numbers (length,...) have to be ignored
      // do nothing
    }
    else if (typeof object[property] === 'object' && object[property] !== null) {

      var newPath = (path ? path + tools.sep + property : property);

      var subproperties = getPaths(object[property], newPath);

      properties = properties.concat(subproperties);
    }
    else {
      var name = (path ? path + '.' + property : property);
      properties.push(name);
    }
  });

  return properties;
};
