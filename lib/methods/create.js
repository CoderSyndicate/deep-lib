/*jslint node: true */
"use strict";

var tools      = require('../tools');
var select     = require('./select').select;
var update     = require('./update').update;
var createPath = require('./createPath').createPath;

/**
 *
 * @function create
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object
 * @param path
 * @param value
 */
exports.create = function create (object, path, value) {
  if (value !== undefined) {

    // get old value
    var exists = select(object, path);

    if (exists === undefined) {
      var parentPath   = tools.parent(path);

      // create path if needed
      createPath(object, parentPath);
    }

    update(object, path, value);
  }
};
