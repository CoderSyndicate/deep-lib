/*jslint node: true */
/*jshint -W018 */
"use strict";

var select = require('./select').select;
var tools  = require('../tools');
var degug  = false;

exports.errorCodes = {
  OBJECT_INVALID_FIRST_PATH_ELEMENT: 'root is an object, so first path element must be a property, not an array',
};

exports.initDepthObject = function initDepthObject (depth, isArray, isArrayIndex) {

  if (depth === undefined) {

    if (isArray && isArrayIndex) {
      depth = [];
    }
    else if (!isArray && isArrayIndex) {
      depth = [];
    }
    else {
      depth = {};
    }
  }
  else if (!isArray && isArrayIndex) {
    depth = [];
  }
  else if (isArray && !isArrayIndex) {
    depth = {};
  }

  return depth;
};

/**
 * Creates, if needed, all objects that are part of the provided path hierarchy.
 * Paths can combine objects and arrays. On each path depth an Object
 * or an Array will be created accordingly.
 *
 * Arrays are referenced using either: one of the wildcards "*+" (push), "*" (push), or an integer.
 * If they are the last depth in the path, a null value will be placed at the specified index or added per push to the array.
 *
 * @function createPath
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object|object[]} object object into which the path will be created
 * @param {string} path the object hierarchy to be created
 * @param {boolean} [force=false] forces the method to change objects in arrays or vice versa to comply to the provided path
 * @param {string} [offset] path used to rebase the processed object to the referenced subobject
 *
 * @todo should return the created path
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}};
 *
 * deep.createPath(a, 'bar');           // => {foo: {hello: 'world'}, bar:{}}
 * deep.createPath(a, 'bar.some.deep.property'); // => {foo: {hello: 'world'}, bar:{some:{deep:{property:{}}
 *
 * Used with Arrays:
 * deep.createPath(a, '*');             // => [null]
 * deep.createPath(a, '*.bar.*');       // => [{bar:[null]}]
 * deep.createPath(a, 'bar.*');         // => {foo: {hello: 'world'}, bar:[null]}
 * deep.createPath(a, 'bar.0');         // => {foo: {hello: 'world'}, bar:[null]}
 * deep.createPath(a, 'bar.*.world');   // => {foo: {hello: 'world'}, bar:[{world:{}}]}
 * deep.createPath(a, 'bar.*.*.world'); // => {foo: {hello: 'world'}, bar:[[{world:{}}]]}
 *
 *
 * Used with offset:
 * deep.createPath(a,     'bar.*.*.world', 'foo'); // => {foo: {hello: 'world', bar:[[{world:{}}]]}}
 * deep.createPath(a.foo, 'bar.*.*.world');        // => {foo: {hello: 'world', bar:[[{world:{}}]]}}
 */
exports.createPath = function createPath (object, path, force, offset) {

  if (typeof force === 'string') {
    offset = force;
    force  = false;
  }

  var error   = null;

  if (offset) {
    // rebase object using provided offset
    object = select(object, offset);
  }

  var pathElements = tools.split(path);
  var realPath = '';
  var nextKey;
  var objectIsArray;
  var keyIsArrayIndex;
  var nextObjectIsArray;
  var nextKeyIsArrayIndex;
  var overwriteAllowed;

  pathElements.forEach(function pathElementIterator (key, i) {
    nextKey = pathElements[i + 1];

    if (realPath) realPath += tools.sep;

    // check rebased root
    objectIsArray       = tools.isArray(object);
    keyIsArrayIndex     = tools.isArrayIndex(key);

    nextObjectIsArray   = tools.isArray(object[key]);
    nextKeyIsArrayIndex = tools.isArrayIndex(nextKey);

    // overwrite is only allowed if:
    // - the force flag is true
    // - the next object is undefined AND a next object is expected
    overwriteAllowed    = force || object[key] === undefined && nextKey !== undefined;

    //if (degug) {
    //  console.log('++++++++++++++++++++++++++++++++++++\n', object);
    //  console.log('      - offset: ', offset);
    //  console.log('      - path: ', path);
    //  console.log('      - realPath: ', realPath);
    //  console.log('      - overwriteAllowed: ', overwriteAllowed);
    //  console.log('      -----');
    //  console.log('      - key: ', key);
    //  console.log('      - objectIsArray: ', objectIsArray);
    //  console.log('      - keyIsArrayIndex: ', keyIsArrayIndex);
    //  console.log('      -----');
    //  console.log('      - pathElements: ', pathElements);
    //  console.log('      - nextIndex: ', i + 1);
    //  console.log('      - nextKey: ', nextKey);
    //  console.log('      - nextDepth === undefined: ', (object[key] === undefined));
    //  console.log('      - nextDepthIsArray: ', tools.isArray(object[key]));
    //  console.log('      - nextIsArrayIndex: ', nextKeyIsArrayIndex);
    //  console.log('      -----');
    //}

    if (
        (
          objectIsArray     !== !!keyIsArrayIndex     || // (XOR OR
          nextObjectIsArray !== !!nextKeyIsArrayIndex    //  XOR)
        ) &&                                             // AND
        !overwriteAllowed                                // NOT
    ) {
      // throw error:
      // - if actual or next object/key types are not compatible
      // - AND no overwrite was allowed
      throw new Error(exports.errorCodes.OBJECT_INVALID_FIRST_PATH_ELEMENT);
    }

    // init depth element (object) if necessary
    exports.initDepthObject(object, objectIsArray, keyIsArrayIndex);

    // get next depth element (object)
    // it will be initialised if it is undefined
    var nextDepthElement = exports.initDepthObject(object[key], tools.isArray(object[key]), nextKeyIsArrayIndex);

    //if (degug) {
    //  console.log('      - nextDepthElement: ', nextDepthElement);
    //  console.log('      -----');
    //}


    if (objectIsArray && keyIsArrayIndex) {
      //if (degug) console.log('      - apply ARRAY logic...');

      // append to the array
      if (keyIsArrayIndex !== true) {
        switch (keyIsArrayIndex) {
          default:
            //console.log('      - push: ', arrayElement);
            key = object.push(nextDepthElement) - 1;
        }
      }
      else {
        object[key] = nextDepthElement;
      }
    }
    else {
      //if (degug) console.log('      - apply OBJECT logic...');

      object[key] = nextDepthElement;
    }

    // add depth name to real path
    realPath += key;

    //if (degug) {
    //  console.log('      -----');
    //  console.log('      - realPath: ', realPath);
    //  console.log('      - object: ', object);
    //}

    // rebase object
    object = nextDepthElement;
  });

  return realPath;
};
