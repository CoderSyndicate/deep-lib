/*jslint node: true */
"use strict";

var deep     = require('../deep-lib');
var tools    = require('../tools');

exports.errorCodes = {
    INVALID_FIRST_PATH_ELEMENT: 'root is an object, so first path element must be a property, not an array'
};

exports.createPath = function createPath (object, path, root) {

    if (root) {
        // rebase object using provided root
        object = deep.get(object, root);
    }

    var pathElements = tools.split(path);
    var nextLevelName;

    if (!tools.isArray(object) && pathElements[0] === '0') {
        // throw error: root is an object,
        // so first element has to be a property
        var error =  new Error(exports.errorCodes.INVALID_FIRST_PATH_ELEMENT);
        error.code = 'INVALID_FIRST_PATH_ELEMENT';

        throw error;
    }

    pathElements.forEach(function pathElementIterator (levelName, i) {

        if (!object[levelName] || typeof object[levelName] !== 'object') {
            nextLevelName = pathElements[i + 1];
            var nextIsArrayIndex = tools.isArrayIndex(nextLevelName);

            if (nextIsArrayIndex) {
                object[levelName] = [];
            }
            else {
                object[levelName] = {};
            }
        }

        if (typeof object === 'object' && object !== null && object.hasOwnProperty(levelName)) {
            // rebase object on next depth
            object = object[levelName];
        }
    });
};
