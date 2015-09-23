/*jslint node: true */
"use strict";

var equalLib = require('deep-equal');
var deepGet  = require('./get').get;
var diff     = require('./diff').diff;

/**
 * Checks for simple equality of provided objects or
 * a referenced substructure
 *
 * @function equal
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object1
 * @param object2
 * @param {string} [offset] path used to rebase the processed object to the referenced subobject
 *
 * @returns {boolean}
 */
exports.equal = function deepEqual (object1, object2, offset) {

  if (offset) {
    // rebase objects using provided path
    object1 = deepGet(object1, offset);
    object2 = deepGet(object2, offset);
  }

  /*
   // TODO open an issue for "deep-equal" seams to be a problem with arrays: test works without "spain" property in test object
   return equalLib(object1, object2);
   */

  //console.log('"deep-equal" and "deep-diff" results are equal: ' , (diff(object1, object2) === undefined) === equalLib(object1, object2));

  return (diff(object1, object2) === undefined);
};
