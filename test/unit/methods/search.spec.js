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

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - search ', function() {
  var clone = deep.clone(data);

  it('should return only value paths ending with "name": /.*\\.name$/', function() {

    var paths = deep.search(clone, /.*\.name$/);

    expect(paths).to.deep.equal([
      'countries.germany.towns.berlin.name',
      'countries.germany.towns.hamburg.name',
      'countries.spain.towns.0.name',
      'countries.spain.towns.1.name'
    ]);
  });

  it('should return only value paths ending with "name" from substructure: /.*\\.name$/', function() {

    var paths = deep.search(clone, /.*\.name$/, 'countries.germany');

    expect(paths).to.deep.equal([
      'towns.berlin.name',
      'towns.hamburg.name'
    ]);
  });
});
