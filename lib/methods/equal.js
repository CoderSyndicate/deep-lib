/*jslint node: true */
"use strict";

var equalLib = require('deep-equal');
var select   = require('./select').select;
var diff     = require('./diff').diff;

/**
 * Makes use of the {@link https://www.npmjs.com/package/deep-equal deep-equal} package to return
 * whether 2 objects are deeply equal or not.
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
 * @returns {boolean} if objects are equal `true` if unequal `false`
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}, some: 'thing'};
 * var b    = {foo: {hello: 'world'}};
 *
 * deep.equal(a, b); // unequal => false
 * deep.equal(a, b, 'foo'); // equal => true
 */
exports.equal = function deepEqual (object1, object2, offset) {

  if (offset) {
    // rebase objects using provided path
    object1 = select(object1, offset);
    object2 = select(object2, offset);
  }

  /*
   // TODO open an issue for "deep-equal" seams to be a problem with arrays: test works without "spain" property in test object
   return equalLib(object1, object2);
   */

  //console.log('"deep-equal" and "deep-diff" results are equal: ' , (diff(object1, object2) === undefined) === equalLib(object1, object2));

  return (diff(object1, object2) === undefined);
};
