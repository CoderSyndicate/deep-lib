/*jslint node: true */
"use strict";

var deep     = require('../deep-lib');
var tools    = require('../tools');

exports.errorCodes = {
    OBJECT_INVALID_FIRST_PATH_ELEMENT: 'root is an object, so first path element must be a property, not an array',
    ARRAY_INVALID_FIRST_PATH_ELEMENT: 'root is an array, so first path element has to be an array position and path must have more thant one element'
};

exports.createPath = function createPath (object, path, root) {
    var error   = null;

    if (root) {
        // rebase object using provided root
        object = deep.get(object, root);
    }

    var pathElements = tools.split(path);
    var nextLevelName;

    var isArray      = tools.isArray(object);
    var isArrayIndex = tools.isArrayIndex(pathElements[0]);

    if (isArrayIndex) {
        if (!isArray) {
            // throw error: root is an object,
            // so first element has to be a property
            error = new Error(exports.errorCodes.OBJECT_INVALID_FIRST_PATH_ELEMENT);
            error.code = 'OBJECT_INVALID_FIRST_PATH_ELEMENT';

            throw error;
        }
        else if (pathElements.length < 2) {
            // root is an array, there should be more than one path element
            error = new Error(exports.errorCodes.ARRAY_INVALID_FIRST_PATH_ELEMENT);
            error.code = 'ARRAY_INVALID_FIRST_PATH_ELEMENT';

            throw error;
        }
    }

    pathElements.forEach(function pathElementIterator (levelName, i) {

        // check rebased root
        isArray       = tools.isArray(object);
        isArrayIndex  = tools.isArrayIndex(levelName);
        //console.log('  -- ', levelName, isArray, isArrayIndex, object);

        nextLevelName = pathElements[i + 1];
        var nextIsArrayIndex = tools.isArrayIndex(nextLevelName);
        //console.log('      - nextLevelName: ', nextLevelName);
        //console.log('      - nextIsArrayIndex: ', nextIsArrayIndex);

        if (isArray && isArrayIndex && isArrayIndex !== true) {
            // we have an array and an array placeholder as path element,
            // create an object with levelName as property
            var arrayElement = {};

            // append to the array
            switch (isArrayIndex) {
                case 'unshift':
                    //console.log('      - unshift: ', arrayElement);
                    object.unshift(arrayElement);
                    break;
                default:
                    //console.log('      - push: ', arrayElement);
                    object.push(arrayElement);
            }

            // rebase root to new array element
            object = arrayElement;
        }
        else {

            if (object[levelName] === undefined) {

                if (nextIsArrayIndex) {
                    object[levelName] = [];
                }
                else {
                    object[levelName] = {};
                }
            }

            if (!nextIsArrayIndex && !tools.isObject(object[levelName])) {
                // next path element is a property, but level is no object
                // overwrite actual value with new object
                //console.log('      - overwrite with object ');
                object[levelName] = {};
            }
            //console.log('      - level: ', object[levelName]);

            if (typeof object === 'object' && object !== null && object.hasOwnProperty(levelName)) {
                // rebase object on next depth
                object = object[levelName];
            }
        }
    });
};
