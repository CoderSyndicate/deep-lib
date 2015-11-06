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
 * @param {string} [offset] path used to rebase processing to the referenced substructure
 * @param {boolean} [force=false] forces the method to change objects in arrays or vice versa to comply to the provided path
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
exports.create = function create (object, path, value, offset, force) {

  if (typeof offset === 'boolean') {
    force  = offset;
    offset = '';
  }

  if (offset) {
    // rebase object using provided offset
    object = select(object, offset);
  }

  if (value !== undefined) {

    path = createPath(object, path, force);

    update(object, path, value);

    return (offset ? offset + tools.sep + path : path);
  }
};
