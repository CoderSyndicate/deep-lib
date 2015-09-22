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

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - equal ', function() {
  var clone = deep.clone(data);

  it('should find data and clone equal', function() {

    var areEqual = deep.equal(clone, data);
    expect(clone).to.deep.equal(data);
    expect(areEqual).to.equal(true);
  });

  it('should find data and clone substructure equal', function() {

    var areEqual = deep.equal(clone, data, 'countries.germany');
    expect(areEqual).to.equal(true);
  });

  it('should find data and changed unequal', function() {
    deep.put(clone, 'countries.france.towns.capital', 'hamburg');

    var areEqual = deep.equal(clone, data);
    expect(areEqual).to.equal(false);
  });

  it('should find data and changed substructure unequal', function() {
    deep.put(clone, 'countries.france.towns.capital', 'paris');

    var areEqual = deep.equal(clone, data, 'countries.france');
    expect(areEqual).to.equal(false);
  });
});
