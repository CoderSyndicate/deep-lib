/*jslint node: true */
"use strict";

var tools  = require('../tools');
var select = require('./select').select;

exports.errorCodes = {
  WILDCARDS_NOT_ALLOWED: 'An update path can not include array wildcards, only plain indexes (integer)',
  UNKNOWN_PROPERTY: 'Could not find the referenced property, unable to update: '
};

/**
 * Updates a property/value pair in the parent object,
 * if the path elements does not exist, the method will throw an error.
 *
 * The method will do nothing if the provided value is `undefined`
 *
 * @function update
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object} object parent object
 * @param {string} path path to the property, starting at the object root
 * @param {*} value value to be assigned to the created property
 * @param {boolean} [ignoreUnknownProperties=false] if set to true, update will ignore errors caused by unknown properties and fail silently
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}};
 *
 * deep.update(a, 'foo.hello', 'mundo'); // update => {foo: {hello: 'mundo'}, some: 'thing'};
 * deep.update(a, 'ciao', 'mondo'); // create => error;
 * deep.create(a, 'some.deep.path.hallo', 'Welt'); // deep create => error;
 */
exports.update = function update (object, path, value, ignoreUnknownProperties) {

  // convert to boolean
  ignoreUnknownProperties = !!ignoreUnknownProperties;

  if (tools.pathIncludesArrayWildcards(path)) {
    // this is an update method: only plain path are allowed, nothing should be created
    throw new Error(exports.errorCodes.WILDCARDS_NOT_ALLOWED, 'proveided path: ', path);
  }

  if (value !== undefined) {
    var propertyName = path;

    if (tools.isDeep(path)) {
      // last element of the path is the property to be assigned
      // remove it from the path elements
      propertyName = tools.property(path);

      // rebase object
      object   = select(object, tools.parent(path));
    }

    if (object === undefined && !ignoreUnknownProperties) {
      throw new Error(exports.errorCodes.UNKNOWN_PROPERTY, path);
    }
    else if (object === undefined && ignoreUnknownProperties) {
      return;
    }
    else {
      if (tools.isArray(object)) {
        object[parseInt(propertyName)] = value;
      }
      else {
        object[propertyName] = value;
      }
    }
  }
};
