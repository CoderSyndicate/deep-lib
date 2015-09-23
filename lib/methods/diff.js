/*jslint node: true */
"use strict";

var diffLib  = require('deep-diff');


var deepGet = require('./get').get;

/**
 *
 *
 * @function diff
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object1
 * @param object2
 * @param {string} [offset] path used to rebase the processed object to the referenced subobject
 */
exports.diff = function deepDiff (object1, object2, offset) {

  if (offset) {
    // rebase objects using provided path
    object1 = deepGet(object1, offset);
    object2 = deepGet(object2, offset);
  }

  return diffLib.diff(object1, object2);
};
