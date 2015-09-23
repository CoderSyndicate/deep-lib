/*jslint node: true */
"use strict";

var deepGet  = require('./get').get;
var getPaths = require('./getPaths').getPaths;

/**
 *
 * @function select
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object
 * @param regex
 * @param path
 * @returns {Array}
 */
exports.select = function deepSelect (object, regex, path) {

  if (path) {
    // rebase object using provided path
    object = deepGet(object, path);
  }

  var paths   = getPaths(object);
  var matches = [];

  paths.forEach(function (valuePath) {
    if (regex.test(valuePath)) {
      matches.push(valuePath);
    }
  });

  return matches;
};
