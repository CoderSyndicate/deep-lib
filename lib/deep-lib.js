/*jslint node: true */
"use strict";

var tools  = require('./tools');

/**
 * Enables to manipulate data and its substructures using dot separated property paths.
 *
 * All provided methods accept a `path` and/or an `offset` arguments referencing some substructure or value in the data.
 * - If `path` is provided, it references the object that will be processed.
 * - If `offset` is provided, it sets the root point in the object for the resolving of the `path` argument.
 *
 * @namespace deep-lib
 *
 * @example
 *
 * // path: 'foo'
 * // |root |referenced substructure
 *   {foo: {hello: 'world'}, hello: 'Mundo'};
 *
 * // path: 'hello'
 * // |root                          |referenced value
 *   {foo: {hello: 'world'}, hello: 'Mundo'};
 *
 * // path: 'foo.hello'
 * // |root         |referenced value
 *   {foo: {hello: 'world'}, hello: 'Mundo'};
 *
 * // path: 'hello' & offset: 'foo'
 * //       |root   |referenced value
 *   {foo: {hello: 'world'}, hello: 'Mundo'};
 */

/**
 *
 * @namespace deep-lib.tools
 * @memberof deep-lib
 */
var tools = {
  parent      : tools.parent,
  property    : tools.property
};

var deep = {

  createPath    : require('./methods/createPath').createPath,
  define        : require('./methods/define').define,
  diff          : require('./methods/diff').diff,
  equal         : require('./methods/equal').equal,
  clone         : require('./methods/clone').clone,
  search        : require('./methods/search').search,
  move          : require('./methods/move').move,
  getPaths      : require('./methods/getPaths').getPaths,
  create        : require('./methods/create').create,
  select        : require('./methods/select').select,
  update        : require('./methods/update').update,
  delete        : require('./methods/delete').delete,
  tools         : tools
};

module.exports = deep;