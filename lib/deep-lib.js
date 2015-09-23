/*jslint node: true */
"use strict";

var tools  = require('./tools');




/**
 * Enables to manipulate data and its substructures using dot separated property paths.
 *
 * All provided methods accept a `path` and/or an `offset` arguments referencing some substructure/value in the data.
 * - If `offset` is provided, the provided object will be rebased to the referenced subobject that will become the new starting point for the path argument.
 * - If `path` is provided, the called method will be applied to the referenced substructure.
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
  defineProperty: require('./methods/defineProperty').defineProperty,
  diff          : require('./methods/diff').diff,
  equal         : require('./methods/equal').equal,
  clone         : require('./methods/clone').clone,
  select        : require('./methods/select').select,
  move          : require('./methods/move').move,
  getPaths      : require('./methods/getPaths').getPaths,
  put           : require('./methods/put').put,
  get           : require('./methods/get').get,
  update        : require('./methods/update').update,
  delete        : require('./methods/delete').delete,
  tools         : tools
};

module.exports = deep;