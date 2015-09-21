/*jslint node: true */
"use strict";

var util     = require('util');

exports.sep   = '.';
exports.arrayPlaceholder = '*';
exports.arrayPush        = '*<';
exports.arrayUnshift     = '>*';

exports.split = function split (path) {
    return (path ? path.split(exports.sep) : []);
};

exports.join = function join (pathElements) {
    return pathElements.join(exports.sep);
};

exports.isArrayIndex = function isArrayIndex (pathElement) {
    switch (pathElement) {
        case exports.arrayPlaceholder:
        case exports.arrayPush:
            return 'push';
        case exports.arrayUnshift:
            return 'unshift';
        default:
            return /^[0-9]+$/.test(pathElement);
    }
};

exports.isObject = function isArrayIndex (pathElement) {
    return (typeof pathElement === 'object' && pathElement !== null);
};

exports.isArray = function isArray (object) {
    return util.isArray(object);
};

exports.isDeep = function isDeep (path) {
    var lastSepIndex = path.lastIndexOf(exports.sep);
    return (lastSepIndex > -1);
};

exports.dirname = function dirname (path) {
    var lastSepIndex = path.lastIndexOf(exports.sep);
    return (lastSepIndex > -1 ? path.substring(0, lastSepIndex) : path);
};

exports.basename = function basename (path) {
    var lastSepIndex = path.lastIndexOf(exports.sep);
    return (lastSepIndex > -1 ? path.substring(lastSepIndex + 1) : path);
};
