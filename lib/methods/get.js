/*jslint node: true */
"use strict";

var tools    = require('../tools');

/**
 * Returns the value referenced by the provided path
 * or the object itself
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*}
 */
exports.get = function deepGet (object, path) {

  var targets = tools.split(path);
  var value   = object;
  var property;

  for (var i = 0; i < targets.length; i++ ) {
    property = targets[i];

    if ( typeof value === 'object' && value !== null && value.hasOwnProperty( property ) ) {
      value = value[property];
    } else {
      return;
    }
  }

  return value;
};
