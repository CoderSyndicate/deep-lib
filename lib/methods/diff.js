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
 * @param path
 */
exports.diff = function deepDiff (object1, object2, path) {

  if (path) {
    // rebase objects using provided path
    object1 = deepGet(object1, path);
    object2 = deepGet(object2, path);
  }

  return diffLib.diff(object1, object2);
};
