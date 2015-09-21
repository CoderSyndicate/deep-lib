/*jslint node: true */
"use strict";

var deep       = require('../deep-lib');
var createPath = require('./createPath').createPath;
var tools      = require('../tools');

exports.defaultOptions = {
    enumerable:   true
};

exports.createProperty = function createProperty (object, path, value, options, root) {
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
            object = deep.get(object, root);
        }

        if (tools.isDeep(path)) {
            // separate property name from path
            property = tools.basename(path);
            path     = tools.dirname(path);

            // make sure path exists
            createPath(object, path);

            // rebase object depth using provided path
            object = deep.get(object, path);
        }

        Object.defineProperty(object, property, options);
    }
};
