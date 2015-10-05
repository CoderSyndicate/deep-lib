/*jslint node: true */
"use strict";

var tools  = require('../tools');
var select = require('./select').select;

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
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}};
 *
 * deep.update(a, 'foo.hello', 'mundo'); // update => {foo: {hello: 'mundo'}, some: 'thing'};
 * deep.update(a, 'ciao', 'mondo'); // create => error;
 * deep.create(a, 'some.deep.path.hallo', 'Welt'); // deep create => error;
 */
exports.update = function update (object, path, value) {
  if (value !== undefined) {
    var propertyName = path;

    if (tools.isDeep(path)) {
      // last element of the path is the property to be assigned
      // remove it from the path elements
      propertyName = tools.property(path);

      // rebase object
      object   = select(object, tools.parent(path));
    }

    if (object === undefined) {
      throw new Error('Could not find the referenced property, unable to update: ', path);
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
