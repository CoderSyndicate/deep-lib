/*jslint node: true */
"use strict";

var tools      = require('../tools');
var deepGet    = require('./get').get;
var update     = require('./update').update;
var createPath = require('./createPath').createPath;

/**
 *
 * @function put
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object
 * @param path
 * @param value
 */
exports.put = function put (object, path, value) {
  if (value !== undefined) {

    // get old value
    var exists = deepGet(object, path);

    if (exists === undefined) {
      var parentPath   = tools.parent(path);

      // create path if needed
      createPath(object, parentPath);
    }

    update(object, path, value);
  }
};
