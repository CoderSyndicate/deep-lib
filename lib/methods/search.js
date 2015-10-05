/*jslint node: true */
"use strict";

var select   = require('./select').select;
var getPaths = require('./getPaths').getPaths;

/**
 * Iterates through all paths found in the object
 * and returns an Array of paths matching the provided regular expression
 *
 * @function search
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object} object Object to be searched
 * @param {RegExp} regex a regular expression
 * @param {string} [offset] path used to rebase the processed object to the referenced subobject
 *
 * @returns {string[]} an array of strings or an empty array if no match was found
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}, some: 'thing'};
 *
 * deep.search(a, /.* /); // => ['foo.hello', 'some']
 * deep.search(a, /.*lo$/); // => ['foo.hello'];
 * deep.search(a, /\d+/); // no match => []
 */
exports.search = function search (object, regex, offset) {

  if (offset) {
    // rebase object using provided path
    object = select(object, offset);
  }

  var paths   = getPaths(object);
  var matches = [];

  paths.forEach(function (valuePath) {
    if (regex.test(valuePath)) {
      matches.push(valuePath);
    }
  });

  return matches;
};
