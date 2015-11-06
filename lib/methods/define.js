/*jslint node: true */
"use strict";

var createPath = require('./createPath').createPath;
var select     = require('./select').select;
var tools      = require('../tools');

/**
 * Default options use when Object.defineProperty
 * is called an no custom options where provided
 *
 * @private
 * @type {*}
 */
exports.defaultOptions = {
  enumerable:   true
};

/**
 * Options that can be applied to the property.
 * @typedef {Object} DefinePropertyOptions
 *
 * @property {boolean} [configurable=false] true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
 * @property {boolean} [enumerable=false] true if and only if this property shows up during enumeration of the properties on the corresponding object.
 * @property {*} [value=undefined] The value associated with the property. Can be any valid JavaScript value (number, object, function, etc).
 * @property {boolean} [writable=false] true if and only if the value associated with the property may be changed with an assignment operator.
 * @property {function} [get=undefined] A function which serves as a getter for the property, or undefined if there is no getter. The function return will be used as the value of property.
 * @property {function} [set=undefined] A function which serves as a setter for the property, or undefined if there is no setter. The function will receive as only argument the new value being assigned to the property.
 *
 * @see {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description}
 */

/**
 * Makes use of {@link Object.defineProperty} to create a property at the provided location
 *
 * @function define
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object|array} object object into which the property will be defined
 * @param {string} path path referencing the property to be created
 * @param {*} value value to be applied to the property, if undefined nothing will be done
 * @param {DefinePropertyOptions} [options] Object.defineProperty options
 * @param {string} [offset] path used to rebase processing to the referenced substructure
 *
 * @todo should return the created path
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}};
 *
 * deep.define(a, 'bar', 42); // => {foo: {hello: 'world'}, bar:42}
 * deep.define(a, 'bar.*', 42); // => {foo: {hello: 'world'}, bar:[42]}
 * deep.define(a, 'bar.0', 42); // => {foo: {hello: 'world'}, bar:[42]}
 * deep.define(a, 'bar.*.world', 42); // => {foo: {hello: 'world'}, bar:[{world:42}]}
 * deep.define(a, 'bar.*.*.world', 42); // => {foo: {hello: 'world'}, bar:[[{world:42}]]}
 *
 * // used with offset
 * deep.define(a, 'bar.*.*.world', 42, 'foo'); // => {foo: {hello: 'world', bar:[[{world:42}]] }}
 *
 * // used with property options
 * deep.define(a, 'bar.*.*.world', 42, {writable:true}, 'foo'); // same as above
 */
exports.define = function define (object, path, value, options, offset) {
  if (value !== undefined) {

    // assume root property (path=property name)
    var property = path;

    // empty options object per default
    options = options || exports.defaultOptions;

    // fix optional parameters
    if (typeof options === 'string') {
      offset = options;
      options = exports.defaultOptions;
    }

    // add value to options
    options.value = value;

    if (offset) {
      // rebase object depth using provided offset
      object = select(object, offset);
    }

    if (tools.isDeep(path)) {
      // separate property name from path
      property = tools.property(path);
      path     = tools.parent(path);

      // make sure path exists
      createPath(object, path);

      // rebase object depth using provided path
      object = select(object, path);
    }

    Object.defineProperty(object, property, options);
  }
};
