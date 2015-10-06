/* jshint node:true */
/* jshint expr:true*/
/* global require */
/* global process */
/* global describe */
/* global after */
/* global it */
'use strict';

var expect   = require('chai').expect;
var diffLib  = require('deep-diff');
var deep     = require('../../../lib/deep-lib');
var tools    = require('../../../lib/tools');
var data     = require('../../object.json');

var createPath = require('../../../lib/methods/createPath').createPath;
var errorCodes = require('../../../lib/methods/update').errorCodes;

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

    it('should throw error if array wildcards are part of the path argument: bar.*', function() {
        var clone = deep.clone(data);

        expect(deep.update.bind(this,clone, 'bar.*')).to.throw(errorCodes.WILDCARDS_NOT_ALLOWED);
    });

    it('should do nothing if value argument is undefined', function() {
        var clone = deep.clone(data);

        deep.update(clone, 'countries.spain.sites.0');

        expect(clone).to.deep.equal(data);
    });

    it('should throw error if provided path point to an unknown property: countries.ireland.sites.0', function() {
        var clone = deep.clone(data);

        expect(deep.update.bind(this,clone, 'countries.ireland.sites.0', 'Giant\'s Causeway')).to.throw(errorCodes.UNKNOWN_PROPERTY);
    });

    it('should fail silently provided path points to an unknown property and ignore error argument is true: countries.ireland.sites.0', function() {
        var clone = deep.clone(data);

        deep.update(clone, 'countries.ireland.sites.0', 'Giant\'s Causeway', true);

        expect(clone).to.deep.equal(data);
    });

    it('should overwrite array element: countries.spain.sites.0', function() {
        var clone = deep.clone(data);

        deep.update(clone, 'countries.spain.sites.0', 'Mojacar');

        var diff = diffLib(data, clone);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal(
            [{"kind":"E","path":["countries","spain","sites",0],"lhs":"Alhambra","rhs":"Mojacar"}]
        );
    });

    it('should overwrite object property: countries.germany.capital', function() {
        var clone = deep.clone(data);

        deep.update(clone, 'countries.germany.capital', 'Bonn');

        var diff = diffLib(data, clone);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal(
            [{"kind":"N","path":["countries","germany","capital"],"rhs":"Bonn"}]
        );
    });

    it('should support root property overwrite: planet', function() {
        var clone = deep.clone(data);

        deep.update(clone, 'planet', 'Mars');

        var diff = diffLib(data, clone);

        expect(clone).to.not.deep.equal(data);
        expect(diff).to.deep.equal(
            [{"kind":"E","path":["planet"],"lhs":"Earth","rhs":"Mars"}]
        );
    });
});
