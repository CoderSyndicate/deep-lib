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

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - put ', function() {
  var clone = deep.clone(data);
  var paris = {
    "name": "Paris",
    "population": 3562166,
    "area": 891.85
  };

  it('should replace a deep value', function() {
    deep.put(clone, 'countries.germany.towns.capital', 'hamburg');
    var control = deep.get(clone, 'countries.germany.towns.capital');

    expect(control).to.equal('hamburg');
  });

  it('should add a deep value', function() {
    deep.put(clone, 'countries.france.towns.capital', 'paris');
    var control = deep.get(clone, 'countries.france.towns.capital');

    expect(control).to.equal('paris');
  });

  it('should add a root value', function() {
    deep.put(clone, 'continents', ['europa']);

    expect(clone.continents).to.deep.equal(['europa']);
  });

  it('should add a deep value in an array', function() {
    deep.put(clone, 'countries.spain.sites.2', 'Gibraltar');
    var control = deep.get(clone, 'countries.spain.sites.2');

    expect(control).to.equal('Gibraltar');
  });

  it('should add a deep value in an array element', function() {
    deep.put(clone, 'countries.spain.towns.0.website', 'http://www.madrid.es');
    var control = deep.get(clone, 'countries.spain.towns.0.website');

    expect(control).to.equal('http://www.madrid.es');
  });

  it('should create an array element to add a value', function() {
    deep.put(clone, 'countries.spain.towns.2.website', 'http://www.madrid.es');
    var control = deep.get(clone, 'countries.spain.towns.2.website');

    expect(control).to.equal('http://www.madrid.es');
  });

  it('should create an array to add an element', function() {
    deep.put(clone, 'countries.spain.array.0', 'sometest');
    var control = deep.get(clone, 'countries.spain.array.0');

    expect(control).to.equal('sometest');
  });

  it('should create an array to add an object element property value', function() {
    deep.put(clone, 'countries.spain.receipts.0.name', 'Paella');
    var control = deep.get(clone, 'countries.spain.receipts.0.name');

    expect(control).to.equal('Paella');
  });

  it('should add a deep structure', function() {
    deep.put(clone, 'countries.france.towns.paris', paris);
    var control = deep.get(clone, 'countries.france.towns.paris');

    expect(control).to.equal(paris);
  });

  it('should ignore undefined values and no substructure created', function() {
    deep.put(clone, 'countries.portugal');
    var control = deep.get(clone, 'countries.portugal.towns');

    expect(control).to.equal(undefined);
  });
});
