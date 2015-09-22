/* jshint node:true */
/* jshint expr:true*/
/* global require */
/* global process */
/* global describe */
/* global after */
/* global it */
"use strict";

var expect   = require('chai').expect;
var deep     = require('../../../lib/deep-lib');
var data     = require('../../object.json');

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - getPaths ', function() {
  var clone = deep.clone(data);

  it('should find no diff between data and clone', function() {

    var paths = deep.getPaths(clone);
    expect(paths).to.deep.equal([
      'countries.germany.towns.capital',
      'countries.germany.towns.berlin.name',
      'countries.germany.towns.berlin.population',
      'countries.germany.towns.berlin.area',
      'countries.germany.towns.hamburg.name',
      'countries.germany.towns.hamburg.population',
      'countries.germany.towns.hamburg.area',
      'countries.spain.sites.0',
      'countries.spain.sites.1',
      'countries.spain.capital',
      'countries.spain.towns.0.name',
      'countries.spain.towns.0.population',
      'countries.spain.towns.0.area',
      'countries.spain.towns.1.name',
      'countries.spain.towns.1.population',
      'countries.spain.towns.1.area'
    ]);
  });
});
