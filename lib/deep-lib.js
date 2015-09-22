/*jslint node: true */
"use strict";

var cloneLib = require('clone');
var equalLib = require('deep-equal');
var diffLib  = require('deep-diff');
var tools    = require('./tools');


var createPath         = require('./methods/createPath').createPath;
var defineProperty     = require('./methods/defineProperty').defineProperty;

exports.createPath     = createPath;
exports.defineProperty = defineProperty;

exports.diff = function deepDiff (object1, object2, path) {

  if (path) {
    // rebase objects using provided path
    object1 = exports.get(object1, path);
    object2 = exports.get(object2, path);
  }

  return diffLib.diff(object1, object2);
};

exports.select = function deepSelect (object, regex, path) {

  if (path) {
    // rebase object using provided path
    object = exports.get(object, path);
  }

  var paths   = exports.getPaths(object);
  var matches = [];

  paths.forEach(function (valuePath) {
    if (regex.test(valuePath)) {
      matches.push(valuePath);
    }
  });

  return matches;
};

/**
 * Checks for simple equality of provided objects or
 * a referenced substructure
 *
 * @param object1
 * @param object2
 * @param {string} [path] path to some substructure
 *
 * @returns {boolean}
 */
exports.equal = function deepEqual (object1, object2, path) {

  if (path) {
    // rebase objects using provided path
    object1 = exports.get(object1, path);
    object2 = exports.get(object2, path);
  }


  /*
   // TODO open an issue for "deep-equal" seams to be a problem with arrays: test works without "spain" property in test object
   return equalLib(object1, object2);
   */
  var isEqual = (exports.diff(object1, object2) === undefined);

  //console.log('"deep-equal" and "deep-diff" results are equal: ' , isEqual === equalLib(object1, object2));

  return isEqual;
};

/**
 * Checks for strict equality of provided objects or
 * a referenced substructure
 *
 * @param object1
 * @param object2
 * @param {string} [path] path to some substructure
 *
 * @returns {boolean}
 */
exports.same = function deepSame (object1, object2, path) {

  if (path) {
    // rebase objects using provided path
    object1 = exports.get(object1, path);
    object2 = exports.get(object2, path);
  }

  return (object1 === object2);
};

/**
 * Returns a deep clone of the provided object.
 * If a path is provided, the method will return
 * a clone of the substructure.
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*}
 */
exports.clone = function deepClone (object, path) {

  if (path) {
    // rebase object using provided path
    object = exports.get(object, path);
  }

  return cloneLib(object);
};

exports.add = function deepAdd (object, path, value) {
  if (value !== undefined) {
    var pathElements = tools.split(path);
    var propertyName = path;

    if (pathElements.length > 1) {
      // last element of the path is the property to be assigned
      // remove it from the path elements
      propertyName = pathElements.pop();

      // create path if needed
      var root = tools.join(pathElements);
      createPath(object, root);

      // rebase object
      object   = exports.get(object, root);
    }

    if (tools.isArray(object)) {
      object[parseInt(propertyName)] = value;
    }
    else {
      object[propertyName] = value;
    }
  }
};

exports.move = function deepMove (object, oldPath, newPath) {
  var value = exports.get(object, oldPath);

  exports.add(object, newPath, value);
  exports.delete(object, oldPath);
};

/**
 * Returns the value referenced by the provided path
 * or the object itself
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*}
 */
exports.get = function deepGet (object, path) {

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

/**
 * Deletes the referenced property and returns
 * its value
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*|undefined} value of the deleted property or false if not found
 */
exports.delete = function deepDelete (object, path) {
  var pathElements = tools.split(path);
  var propertyName = path;

  if (pathElements.length > 1) {
    propertyName = pathElements.pop();
    path         = tools.join(pathElements);
  }

  object = exports.get(object, path);

  if (object === undefined) {
    return;
  }

  var value   = object[propertyName];

  if (tools.isArray(object)) {
    object.splice(propertyName, 1);
  }
  else {
    delete object[propertyName];
  }

  return value;
};

exports.getPaths = function getPaths (object, path) {
  var properties = [];

  Object.getOwnPropertyNames(object).forEach(function propertyIterator(property) {

    if (tools.isArray(object) && !tools.isArrayIndex(property)) {
      // array properties that are not numbers (length,...) have to be ignored
      // do nothing
    }
    else if (typeof object[property] === 'object' && object[property] !== null) {

      var newPath = (path ? path + tools.sep + property : property);

      var subproperties = getPaths(object[property], newPath);

      properties = properties.concat(subproperties);
    }
    else {
      var name = (path ? path + '.' + property : property);
      properties.push(name);
    }
  });

  return properties;
};
