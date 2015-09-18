/*jslint node: true */
"use strict";

var deep     = require('../deep-lib');
var tools    = require('../tools');

exports.createPath = function createPath (object, path, root) {

    if (root) {
        // rebase object using provided root
        object = deep.get(object, root);
    }

    var pathElements = tools.split(path);
    var nextLevelName;

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
