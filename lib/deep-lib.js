/*jslint node: true */
"use strict";

var tools  = require('./tools');

/**
 * Enables to manipulate data and its substructures using dot separated property paths.
 *
 * All provided methods accept a `path` and/or an `offset` arguments referencing some substructure/value in the data.
 * - If `offset` is provided, object will be rebased to the referenced subobject that will become the processing subject.
 * - If `path` is provided, it references the object that will be processed. If `offset` was also provided, it is the starting point of the `path`.
 *
 * @namespace deep-lib
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