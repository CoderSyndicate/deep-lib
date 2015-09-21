/* jshint node:true */
/* jshint expr:true*/
/* global require */
/* global process */
/* global describe */
/* global after */
/* global it */
"use strict";

var expect   = require('chai').expect;
var diffLib  = require('deep-diff');
var deep     = require('../../../lib/deep-lib');
var tools    = require('../../../lib/tools');
var data     = require('../../object.json');

var createPath = require('../../../lib/methods/createPath').createPath;
var errorCodes = require('../../../lib/methods/createPath').errorCodes;

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - createPath ', function() {

    it('should create root object: object1', function() {
        var clone = deep.clone(data);

        createPath(clone, 'object1');

        var diff = diffLib(data, clone);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal(
          [{"kind": "N","path": ["object1"],"rhs": {}}]
        );
    });

    it('should throw error if first path element for an object is an array: 0', function() {
        var clone = deep.clone(data);

        expect(createPath.bind(this,clone, '0')).to.throw(errorCodes.OBJECT_INVALID_FIRST_PATH_ELEMENT);
    });

    it('should throw error if first path element for an array is an array, and path element length is one: 0', function() {
        var clone = deep.clone(data);

        expect(createPath.bind(this,clone.countries.spain.sites, '0'))
            .to.throw(errorCodes.ARRAY_INVALID_FIRST_PATH_ELEMENT);
    });

    it('should append new array element if first path element is a property: '+tools.arrayPlaceholder+'.prop1', function() {
        var clone = deep.clone(data);

        createPath(clone.countries.spain.sites, tools.arrayPlaceholder + '.prop1');

        var diff = diffLib(data, clone);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal(
            [{"kind":"A","path":["countries","spain","sites"],"index":2,"item":{"kind":"N","rhs":{"prop1":{}}}}]
        );
    });

    it('should create deep object in a new array element: '+tools.arrayPlaceholder+'.lvl1.lvl2', function() {
        var clone = deep.clone(data);

        createPath(clone.countries.spain.sites, tools.arrayPlaceholder + '.lvl1.lvl2');

        var diff = diffLib(data, clone);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal(
            [{"kind":"A","path":["countries","spain","sites"],"index":2,"item":{"kind":"N","rhs":{"lvl1":{"lvl2":{}}}}}]
        );
    });

    it('should overwrite array element if first path element is an index: 0.lvl1', function() {
        var clone = deep.clone(data);

        createPath(clone.countries.spain.sites, '0.lvl1');

        var diff = diffLib(data, clone);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal(
            [{"kind":"E","path":["countries","spain","sites",0],"lhs":"Alhambra","rhs":{"lvl1":{}}}]
        );
    });

    it('should create deep object behind an array: 0.lvl1.lvl2', function() {
        var clone = deep.clone(data);

        createPath(clone.countries.spain.sites, '0.lvl1.lvl2');

        var diff = diffLib(data, clone);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal(
            [{"kind":"E","path":["countries","spain","sites",0],"lhs":"Alhambra","rhs":{"lvl1":{"lvl2":{}}}}]
        );
    });
});
