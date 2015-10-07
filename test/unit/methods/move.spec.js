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

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - move ', function() {
  var clone = deep.clone(data);

  it('should move a deep structure', function() {
    var oldPath = 'countries.germany';
    var newPath = 'countries.france';

    var moved = deep.select(clone, oldPath);

    deep.move(clone, oldPath, newPath);
    var empty   = deep.select(clone, oldPath);
    var control = deep.select(clone, newPath);
    var value   = deep.select(data, oldPath);

    expect(empty).to.equal(undefined);
    expect(control).to.deep.equal(value);
    expect(control).to.equal(moved);
  });

  it('should move an array element to a different array', function() {
    var oldPath = 'countries.spain.sites.0';
    var newPath = 'countries.france.sites.0';

    var moved = deep.select(clone, oldPath);

    deep.move(clone, oldPath, newPath);
    var nextElement = deep.select(clone, oldPath);
    var control     = deep.select(clone, newPath);
    var original    = deep.select(data, oldPath);

    expect(nextElement).to.equal('Cabo de Gata');
    expect(control).to.deep.equal(original);
    expect(control).to.equal(moved);
  });

  it('should move an array element to an object', function() {
    var oldPath = 'countries.spain.sites.0';
    var newPath = 'countries.spain.bestSite';

    var moved = deep.select(clone, oldPath);

    deep.move(clone, oldPath, newPath);
    var empty   = deep.select(clone, oldPath);
    var control = deep.select(clone, newPath);

    expect(empty).to.equal(undefined);
    expect(control).to.equal(moved);
  });

  it('should move a deep value', function() {
    deep.create(clone, 'countries.france.towns.capital', 'hamburg');
    var control = deep.select(clone, 'countries.france.towns.capital');


    expect(control).to.equal('hamburg');
  });
});
