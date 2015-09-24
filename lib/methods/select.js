/*jslint node: true */
"use strict";

var tools    = require('../tools');

/**
 * Returns the value referenced by the provided path
 * or `undefined` if some element of the path does not exist
 *
 * @function select
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*|undefined} the referenced value or `undefined`
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}, some: 'thing'};
 *
 * deep.select(a); // => {foo: {hello: 'world'}, some: 'thing'};
 * deep.select(a, 'foo'); // => {hello: 'world'}
 * deep.select(a, 'foo.hello'); // => 'world'
 * deep.select(a, 'foo.bad'); // => undefined
 */
exports.select = function select (object, path) {

  var targets = tools.split(path);
  var value   = object;
  var property;

  for (var i = 0; i < targets.length; i++ ) {
    property = targets[i];

    if ( typeof value === 'object' && value !== null && value.hasOwnProperty( property ) ) {
      value = value[property];
    } else {
      return;
    }
  }

  return value;
};
