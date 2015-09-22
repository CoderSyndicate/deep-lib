/*jslint node: true */
"use strict";

var diffLib  = require('deep-diff');


var deepGet = require('./get').get;

exports.diff = function deepDiff (object1, object2, path) {

  if (path) {
    // rebase objects using provided path
    object1 = deepGet(object1, path);
    object2 = deepGet(object2, path);
  }

  return diffLib.diff(object1, object2);
};
