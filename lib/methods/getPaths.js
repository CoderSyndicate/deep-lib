/*jslint node: true */
"use strict";

var tools    = require('../tools');

/**
 * Crawls through an object to generate a list of all path pointing to a property value pair.
 * It lists all paths fully, ignoring the disabled `enumerable` option that some properties might have.
 *
 * @function getPaths
 * @memberof deep-lib
 * @static
 * @public
 *
 * @param object object to be crawled
 * @param {string} [offset] path used to rebase processing to the referenced substructure
 *
 * @returns {string[]} a list of all paths found in the provided object
 *
 * @example
 * var deep = require('deep-lib');
 * var a    = {foo: {hello: 'world'}, some: 'thing'};
 *
 * deep.getPaths(a); // => ['foo.hello', 'some']
 * deep.getPaths(a, 'foo'); // => ['hello']
 */
exports.getPaths = function getPaths (object, offset) {
  var properties = [];

  Object.getOwnPropertyNames(object).forEach(function propertyIterator(property) {

    if (tools.isArray(object) && !tools.isArrayIndex(property)) {
      // array properties that are not numbers (length,...) have to be ignored
      // do nothing
    }
    else if (typeof object[property] === 'object' && object[property] !== null) {

      var newPath = (offset ? offset + tools.sep + property : property);

      var subproperties = getPaths(object[property], newPath);

      properties = properties.concat(subproperties);
    }
    else {
      var name = (offset ? offset + '.' + property : property);
      properties.push(name);
    }
  });

  return properties;
};
