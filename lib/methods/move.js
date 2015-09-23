/*jslint node: true */
"use strict";

var deepGet    = require('./get').get;
var deepPut    = require('./put').put;
var deepDelete = require('./delete').delete;

/**
 *
 * @function move
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object
 * @param oldPath
 * @param newPath
 */
exports.move = function deepMove (object, oldPath, newPath) {
  var value = deepGet(object, oldPath);

  deepPut(object, newPath, value);
  deepDelete(object, oldPath);
};
