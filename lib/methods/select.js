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
 * @param {string} [offset] path used to rebase the processed object to the referenced subobject
 * @returns {Array}
 */
exports.select = function deepSelect (object, regex, offset) {

  if (offset) {
    // rebase object using provided path
    object = deepGet(object, offset);
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
