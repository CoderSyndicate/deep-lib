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

var createProperty = require('../../../lib/methods/createProperty').createProperty;

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - createProperty ', function() {

    it('should do nothing if provided value is undefined', function() {
        var clone = deep.clone(data);

        createProperty(clone, 'propOnRoot');
        expect(clone).to.deep.equal(data);
    });

    it('should create root properties', function() {
        var clone = deep.clone(data);
        var value = 'worked!';

        createProperty(clone, 'propOnRoot', value, {
            enumerable:   true // otherwise not visible to diff
        });

        var diff = diffLib(data, clone);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal([ { kind: 'N', path: [ 'propOnRoot' ], rhs: value } ]);
        expect(clone.propOnRoot).to.equal(value);
    });

    it('should create deep properties', function() {
        var clone = deep.clone(data);

        createProperty(clone, 'root.depth1.0.property', 'worked!', {
            enumerable:   true // otherwise not visible to diff
        });

        var diff = diffLib(data, clone);
        console.log(clone);
        console.log(diff[0].rhs);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal([ { kind: 'N', path: [ 'propOnRoot' ], rhs: 'isRoot' } ]);
    });
});
