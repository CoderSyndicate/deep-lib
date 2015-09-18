/* jshint node:true */
/* jshint expr:true*/
/* global require */
/* global process */
/* global describe */
/* global after */
/* global it */
"use strict";

console.log(__filename);
var should   = require('chai').should();
var expect   = require('chai').expect;
var deep     = require('../../../lib/deep-lib');
var data     = require('../../object.json');

var createProperty = require('../../../lib/methods/createProperty').createProperty;

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - createProperty ', function() {
    var clone = deep.clone(data);

    it('should do nothing if provided value is undefined', function() {
        createProperty(clone, 'propOnRoot');
        expect(clone).to.deep.equal(data);
    });

    it('should have the same structure', function() {
        expect(clone).to.deep.equal(data);
    });

    it('should not change source object', function() {
        clone.countries.germany.towns.capital = 'hamburg';

        expect(clone.countries.germany.towns.capital).to.not.equal(data.countries.germany.towns.capital);
        expect(data.countries.germany.towns.capital).to.equal('berlin');
    });

    it('should work with substructures', function() {
        var clone = deep.clone(data, 'countries.germany');
        expect(clone).to.deep.equal(data.countries.germany);
    });
});
