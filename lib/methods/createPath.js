/*jslint node: true */
"use strict";

var select = require('./select').select;
var tools  = require('../tools');

exports.errorCodes = {
  OBJECT_INVALID_FIRST_PATH_ELEMENT: 'root is an object, so first path element must be a property, not an array',
  ARRAY_INVALID_FIRST_PATH_ELEMENT: 'root is an array, so first path element has to be an array position and path must have more thant one element'
};

/**
 * Creates, if needed, all objects that are part of the provided path hierarchy.
 * Paths can combine objects and arrays. On each path depth an Object
 * or an Array will be created accordingly.
 *
 * Arrays are referenced using either: one of the wildcards (*, +*, *+), or an index
 *
 * @function createPath
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object|object[]} object object into which the path will be created
 * @param {string} path the object hierarchy to be created
 * @param {string} [offset] path used to rebase the processed object to the referenced subobject
 *
 * @todo should return the created path
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}};
 *
 * deep.createPath(a, 'bar'); // => {foo: {hello: 'world'}, bar:{}}
 * deep.createPath(a, 'bar.*'); // => {foo: {hello: 'world'}, bar:[]}
 * deep.createPath(a, 'bar.0'); // => {foo: {hello: 'world'}, bar:[]}
 * deep.createPath(a, 'bar.*.world'); // => {foo: {hello: 'world'}, bar:[{world:{}}]}
 * deep.createPath(a, 'bar.*.*.world'); // => {foo: {hello: 'world'}, bar:[[{world:{}}]]}
 *
 * // used with offset
 * deep.createPath(a, 'bar.*.*.world', 'foo'); // => {foo: {hello: 'world', bar:[[{world:{}}]]}}
 */
exports.createPath = function createPath (object, path, offset) {
  var error   = null;

  if (offset) {
    // rebase object using provided offset
    object = select(object, offset);
  }

  var pathElements = tools.split(path);
  var nextLevelName;

  var isArray      = tools.isArray(object);
  var isArrayIndex = tools.isArrayIndex(pathElements[0]);

  if (isArrayIndex) {
    if (!isArray) {
      // throw error: root is an object,
      // so first element has to be a property
      error = new Error(exports.errorCodes.OBJECT_INVALID_FIRST_PATH_ELEMENT);
      error.code = 'OBJECT_INVALID_FIRST_PATH_ELEMENT';

      throw error;
    }
    else if (pathElements.length < 2) {
      // root is an array, there should be more than one path element
      error = new Error(exports.errorCodes.ARRAY_INVALID_FIRST_PATH_ELEMENT);
      error.code = 'ARRAY_INVALID_FIRST_PATH_ELEMENT';

      throw error;
    }
  }

  pathElements.forEach(function pathElementIterator (levelName, i) {

    // check rebased root
    isArray       = tools.isArray(object);
    isArrayIndex  = tools.isArrayIndex(levelName);
    //console.log('  -- ', levelName, isArray, isArrayIndex, object);

    nextLevelName = pathElements[i + 1];
    var nextIsArrayIndex = tools.isArrayIndex(nextLevelName);
    //console.log('      - nextLevelName: ', nextLevelName);
    //console.log('      - nextIsArrayIndex: ', nextIsArrayIndex);

    if (isArray && isArrayIndex && isArrayIndex !== true) {
      // we have an array and an array placeholder as path element,
      // create an object with levelName as property
      var arrayElement = {};

      // append to the array
      switch (isArrayIndex) {
        case 'unshift':
          //console.log('      - unshift: ', arrayElement);
          object.unshift(arrayElement);
          break;
        default:
          //console.log('      - push: ', arrayElement);
          object.push(arrayElement);
      }

      // rebase root to new array element
      object = arrayElement;
    }
    else {

      if (object[levelName] === undefined) {

        if (nextIsArrayIndex) {
          object[levelName] = [];
        }
        else {
          object[levelName] = {};
        }
      }

      if (!nextIsArrayIndex && !tools.isObject(object[levelName])) {
        // next path element is a property, but level is no object
        // overwrite actual value with new object
        //console.log('      - overwrite with object ');
        object[levelName] = {};
      }
      //console.log('      - level: ', object[levelName]);

      if (typeof object === 'object' && object !== null && object.hasOwnProperty(levelName)) {
        // rebase object on next depth
        object = object[levelName];
      }
    }
  });
};
