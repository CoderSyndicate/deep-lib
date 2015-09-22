/*jslint node: true */
"use strict";

var tools    = require('./tools');


exports.createPath      = require('./methods/createPath').createPath;
exports.defineProperty  = require('./methods/defineProperty').defineProperty;
exports.diff            = require('./methods/diff').diff;
exports.equal           = require('./methods/equal').equal;
exports.clone           = require('./methods/clone').clone;
exports.select          = require('./methods/select').select;
exports.move            = require('./methods/move').move;
exports.getPaths        = require('./methods/getPaths').getPaths;
exports.put             = require('./methods/put').put;
exports.get             = require('./methods/get').get;
exports.update          = require('./methods/update').update;
exports.delete          = require('./methods/delete').delete;

exports.tools           = {
  parent: tools.parent,
  property:   tools.property
};