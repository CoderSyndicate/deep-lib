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

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - clone ', function() {
  var clone = deep.clone(data);

  it('should return undefined if a bad reference was provided', function() {
    var clone = deep.clone(data, 'unknown.test');
    expect(clone).to.equal(undefined);
  });

  it('should not have the same object reference', function() {
    expect(clone).to.not.equal(data);
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

  it('should return a property value', function() {
    var clone = deep.clone(data, 'countries.germany.towns.capital');
    expect(clone).to.deep.equal(data.countries.germany.towns.capital);
  });
});
