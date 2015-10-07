/*jslint node: true */
"use strict";

var tools    = require('../tools');

exports.errorCodes = {
  WILDCARDS_NOT_ALLOWED: 'An update path can not include array wildcards, only plain indexes (integer)'
};

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
 * @param {string} [path] path to some substructure, array wildcards are not allowed in it
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

  if (tools.pathIncludesArrayWildcards(path)) {
    // this is an update method: only plain path are allowed, nothing should be created
    throw new Error(exports.errorCodes.WILDCARDS_NOT_ALLOWED, 'proveided path: ', path);
  }

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
