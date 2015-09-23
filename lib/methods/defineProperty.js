/*jslint node: true */
"use strict";

var createPath = require('./createPath').createPath;
var deepGet    = require('./get').get;
var tools      = require('../tools');

/**
 * Default options use when Object.defineProperty
 * is called an no custom options where provided
 *
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
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators}
 */

/**
 * Makes use of {@link Object.defineProperty} to create a property at the provided location
 *
 * @function defineProperty
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param {object|array} object root object in which depths the property will be defined
 * @param {string} path path locating the property to be created
 * @param {*} value value to be applied to the property, undefined will be ignored
 * @param {DefinePropertyOptions} options Object.defineProperty options
 * @param {string} path used to rebase the root object argument before proceeding
 */
exports.defineProperty = function defineProperty (object, path, value, options, root) {
  if (value !== undefined) {

    // assume root property (path=property name)
    var property = path;

    // empty options object per default
    options = options || exports.defaultOptions;

    // fix optional parameters
    if (typeof options === 'string') {
      root = options;
      options = exports.defaultOptions;
    }

    // add value to options
    options.value = value;

    if (root) {
      // rebase object depth using provided root
      object = deepGet(object, root);
    }

    if (tools.isDeep(path)) {
      // separate property name from path
      property = tools.property(path);
      path     = tools.parent(path);

      // make sure path exists
      createPath(object, path);

      // rebase object depth using provided path
      object = deepGet(object, path);
    }

    Object.defineProperty(object, property, options);
  }
};
