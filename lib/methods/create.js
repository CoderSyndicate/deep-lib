/*jslint node: true */
"use strict";

var tools      = require('../tools');
var select     = require('./select').select;
var update     = require('./update').update;
var createPath = require('./createPath').createPath;

/**
 * Creates/updates a new property/value pair in the parent object,
 * if the path elements do not exist, the method will take
 * care of their creation calling {@link deep-lib.createPath}.
 *
 * The method will do nothing if the provided value is equal to "undefined"
 *
 * @function create
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object} object parent object
 * @param {string} path path to the property, starting at the object root
 * @param {*} value value to be assigned to the created property
 *
 * @returns {string} the newly created path
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}};
 *
 * deep.create(a, 'ciao', 'mondo'); // create => {foo: {hello: 'world'}, ciao: 'mondo',};
 * deep.create(a, 'foo.hello', 'mundo'); // update => {foo: {hello: 'mundo'}, some: 'thing'};
 * deep.create(a, 'some.deep.path.hallo', 'Welt'); // deep create => {foo: {hello: 'world'}, some: {deep: {path: {hallo: 'Welt'}}}};
 */
exports.create = function create (object, path, value) {
  if (value !== undefined) {

    // get old value
    var exists = select(object, path);

    if (exists === undefined) {
      var parentPath   = tools.parent(path);

      // create path if needed
      createPath(object, parentPath);
    }

    update(object, path, value);

    return path;
  }
};
