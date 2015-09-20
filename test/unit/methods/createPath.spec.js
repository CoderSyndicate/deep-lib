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

        expect(createPath.bind(this,clone, '0')).to.throw(errorCodes.INVALID_FIRST_PATH_ELEMENT);
    });

    it('should create array element if root is an array', function() {
        var clone = deep.clone(data);

        createPath(clone.countries.spain.sites, '0');

        var diff = diffLib(data, clone);
        console.log(clone.countries.spain);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal(
          [{"kind": "N","path": ["object1"],"rhs": {}}]
        );
    });

    it('should work with substructures', function() {
        var clone = deep.clone(data, 'countries.germany');
        expect(clone).to.deep.equal(data.countries.germany);
    });
});
