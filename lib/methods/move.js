/*jslint node: true */
"use strict";

var deepSelect = require('./select').select;
var deepPut    = require('./create').create;
var deepDelete = require('./delete').delete;

/**
 * Moves a property or subobject within the provided object
 *
 * @function move
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object|array} object object to be changed
 * @param {string} oldPath path to the old property
 * @param {string} newPath path to the new property
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}, some: 'thing'};
 *
 * deep.move(a, 'some', 'foo.some'); // => {foo: {hello: 'world', some: 'thing'}};
 * deep.move(a, 'some', 'foo.hello.world'); // => {foo: {hello: {world: 'thing'}}};
 */
exports.move = function deepMove (object, oldPath, newPath) {
  var value = deepSelect(object, oldPath);

  if (value) {
    deepPut(object, newPath, value);
    deepDelete(object, oldPath);
  }
  else {
    // TODO throw error
  }
};
