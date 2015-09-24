/*jslint node: true */
"use strict";

var diffLib = require('deep-diff');
var select  = require('./select').select;

/**
 * Makes use of the {@link https://www.npmjs.com/package/deep-diff deep-diff} package to return
 * the differences between 2 objects in JSON format. It generates a patch format that could be applied
 * to another object, or reverted later on.
 *
 * @function diff
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object1 reference object, all differences are expressed in relation to it
 * @param object2 comparison object
 * @param {string} [offset] path used to rebase the processed object to the referenced subobject
 *
 * @returns {object[]|undefined} returns a diff object or `undefined` if both object are deeply equal
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}, some: 'thing'};
 * var b    = {foo: {hello: 'world'}};
 *
 * deep.diff(a, b); // unequal => [{"kind": "D","path": ["some"],"rhs": "thing"}]
 * deep.diff(a, b, 'foo'); // equal => undefined
 */
exports.diff = function deepDiff (object1, object2, offset) {

  if (offset) {
    // rebase objects using provided path
    object1 = select(object1, offset);
    object2 = select(object2, offset);
  }

  return diffLib.diff(object1, object2);
};
