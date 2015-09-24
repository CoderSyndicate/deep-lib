/*jslint node: true */
"use strict";

var select   = require('./select').select;
var getPaths = require('./getPaths').getPaths;

/**
 *
 * @function search
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object
 * @param regex
 * @param {string} [offset] path used to rebase the processed object to the referenced subobject
 * @returns {Array}
 */
exports.search = function search (object, regex, offset) {

  if (offset) {
    // rebase object using provided path
    object = select(object, offset);
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
