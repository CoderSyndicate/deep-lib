/* jshint node:true */
/* jshint expr:true*/
/* global require */
/* global process */
/* global describe */
/* global after */
/* global it */
"use strict";

var expect    = require('chai').expect;
var diffLib   = require('deep-diff');
var deep      = require('../../../lib/deep-lib');
var data      = require('../../object.json');
var pathTests = require('../../paths.json');
var value     = 'WORKED!!!';

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - create ', function() {

  // iterate through all the path tests
  pathTests.forEach(function testIterator (test) {
    if (test.type === 'create') {
      // only interested in create tests

      it('should ' + test.description+ ': ' + test.path , function() {

        // clone test data to be able to compare
        var clone = deep.clone(data);

        if (typeof test.createResult === 'string') {
          expect(deep.create.bind(this, clone, test.path, value, test.force)).to.throw(test.value);
        }
        else {

          var realPath = deep.create(clone, test.path, value, test.force);

          var diff = diffLib(data, clone);

          if (false) {
            console.log('diff: ',JSON.stringify(diff));
            console.log('result: ',realPath,' = ', deep.select(clone, realPath));
          }

          expect(clone).to.not.deep.equal(data);
          expect(diff).to.deep.equal(test.createResult);
          expect(realPath).to.deep.equal(test.realPath);
        }
      });
    }
  });

  var clone = deep.clone(data);
  var paris = {
    "name": "Paris",
    "population": 3562166,
    "area": 891.85
  };

  it('should ignore undefined values and no substructure created', function() {
    deep.create(clone, 'countries.portugal');
    var control = deep.select(clone, 'countries.portugal.towns');

    expect(control).to.equal(undefined);
  });

  it('should replace a deep value', function() {
    deep.create(clone, 'countries.germany.towns.capital', 'hamburg');
    var control = deep.select(clone, 'countries.germany.towns.capital');

    expect(control).to.equal('hamburg');
  });

  it('should add a deep value', function() {
    deep.create(clone, 'countries.france.towns.capital', 'paris');
    var control = deep.select(clone, 'countries.france.towns.capital');

    expect(control).to.equal('paris');
  });

  it('should add a root value', function() {
    deep.create(clone, 'continents', ['europa']);

    expect(clone.continents).to.deep.equal(['europa']);
  });

  it('should add a deep value in an array', function() {
    deep.create(clone, 'countries.spain.sites.2', 'Gibraltar');
    var control = deep.select(clone, 'countries.spain.sites.2');

    expect(control).to.equal('Gibraltar');
  });

  it('should add a deep value in an array element', function() {
    deep.create(clone, 'countries.spain.towns.0.website', 'http://www.madrid.es');
    var control = deep.select(clone, 'countries.spain.towns.0.website');

    expect(control).to.equal('http://www.madrid.es');
  });

  it('should create an array element to add a value', function() {
    deep.create(clone, 'countries.spain.towns.2.website', 'http://www.madrid.es');
    var control = deep.select(clone, 'countries.spain.towns.2.website');

    expect(control).to.equal('http://www.madrid.es');
  });

  it('should create an array to add an element', function() {
    deep.create(clone, 'countries.spain.array.0', 'sometest');
    var control = deep.select(clone, 'countries.spain.array.0');

    expect(control).to.equal('sometest');
  });

  it('should create an array to add an object element property value', function() {
    deep.create(clone, 'countries.spain.receipts.0.name', 'Paella');
    var control = deep.select(clone, 'countries.spain.receipts.0.name');

    expect(control).to.equal('Paella');
  });

  it('should add a deep structure', function() {
    deep.create(clone, 'countries.france.towns.paris', paris);
    var control = deep.select(clone, 'countries.france.towns.paris');

    expect(control).to.equal(paris);
  });
});
