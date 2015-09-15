/*jslint node: true */
"use strict";

var cloneLib = require('clone');
var equalLib = require('deep-equal');
var diffLib  = require('deep-diff');
var sep      = '.';

function split (path) {
    return (path ? path.split(sep) : []);
}

function join (pathElements) {
    return pathElements.join(sep);
}

exports.diff = function deepDiff (object1, object2, path) {

    if (path) {
        // rebase objects using provided path
        object1 = exports.get(object1, path);
        object2 = exports.get(object2, path);
    }

    return diffLib.diff(object1, object2);
};

/**
 * Checks for simple equality of provided objects or
 * a referenced substructure
 *
 * @param object1
 * @param object2
 * @param {string} [path] path to some substructure
 *
 * @returns {boolean}
 */
exports.equal = function deepEqual (object1, object2, path) {

    if (path) {
        // rebase objects using provided path
        object1 = exports.get(object1, path);
        object2 = exports.get(object2, path);
    }

    return equalLib(object1, object2, {strict:true});
};

/**
 * Checks for strict equality of provided objects or
 * a referenced substructure
 *
 * @param object1
 * @param object2
 * @param {string} [path] path to some substructure
 *
 * @returns {boolean}
 */
exports.same = function deepSame (object1, object2, path) {

    if (path) {
        // rebase objects using provided path
        object1 = exports.get(object1, path);
        object2 = exports.get(object2, path);
    }

    return (object1 === object2);
};

/**
 * Returns a deep clone of the provided object.
 * If a path is provided, the method will return
 * a clone of the substructure.
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*}
 */
exports.clone = function deepClone (object, path) {

    if (path) {
        // rebase object using provided path
        object = exports.get(object, path);
    }

    return cloneLib(object);
};

exports.add = function deepAdd (object, path, value) {
    var pathElements = split(path);
    var propertyName = path;
    var levelName;

    if (pathElements.length > 1) {
        propertyName = pathElements.pop();
    }

    for (var i = 0; i < pathElements.length; i++ ) {
        levelName = pathElements[i];

        if (!object[levelName]) {
            object[levelName] = {};
        }

        if ( typeof object === 'object' && object !== null && object.hasOwnProperty(levelName) ) {

            object = object[levelName];
        }
    }

    object[propertyName] = value;
};

exports.move = function deepMove (object, oldPath, newPath) {
    var value = exports.get(object, oldPath);

    exports.add(object, newPath, value);
    exports.delete(object, oldPath);
};

/**
 * Returns the value referenced by the provided path
 * or the object itself
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*}
 */
exports.get = function deepGet (object, path) {

    var targets = split(path);
    var value   = object;
    var property;

    for (var i = 0; i < targets.length; i++ ) {
        property = targets[i];

        if ( typeof value === 'object' && value !== null && value.hasOwnProperty( property ) ) {
            value = value[property];
        } else {
            return;
        }
    }

    return value;
};

/**
 * Deletes the referenced property and returns
 * its value
 *
 * @param {object} object source object
 * @param {string} [path] path to some substructure
 *
 * @returns {*|undefined} value of the deleted property or false if not found
 */
exports.delete = function deepDelete (object, path) {
    var pathElements = split(path);
    var propertyName = path;

    if (pathElements.length > 1) {
        propertyName = pathElements.pop();
        path         = join(pathElements);
    }

    object = exports.get(object, path);

    if (object === undefined) {
        return;
    }

    var value   = object[propertyName];

    delete object[propertyName];

    return value;
};

exports.getPaths = function getPaths (object, path) {
    var properties = [];

    Object.getOwnPropertyNames(object).forEach(function propertyIterator(property) {
        if (typeof object[property] === 'object' && object[property] !== null) {
            path = (path ? path + sep + property : property);

            var subproperties = getPaths(object[property], path);

            properties = properties.concat(subproperties);
        }
        else {
            var name = (path ? path + '.' + property : property);
            properties.push(name);
        }
    });

    return properties;
};
