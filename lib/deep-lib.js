/*jslint node: true */
"use strict";

var tools  = require('./tools');




/**
 * This is the singleton.
 *
 * @namespace deep-lib
 */
/**
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