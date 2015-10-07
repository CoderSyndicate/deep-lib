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

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - diff ', function() {
  var clone = deep.clone(data);

  it('should find no diff between data and clone', function() {

    var diff = deep.diff(clone, data);
    expect(diff).to.equal(undefined);
  });

  it('should return differences between data and changed', function() {
    deep.create(clone, 'countries.germany.towns.capital', 'hamburg');

    var diff = deep.diff(clone, data);
    expect(diff).to.deep.equal([
      {
        kind: 'E',
        path: [ 'countries', 'germany', 'towns', 'capital' ],
        lhs: 'hamburg',
        rhs: 'berlin'
      }
    ]);
  });

  it('should return differences between data and changed substructures', function() {

    var diff = deep.diff(clone, data, 'countries.germany.towns');
    expect(diff).to.deep.equal([
      {
        kind: 'E',
        path: [ 'capital' ],
        lhs: 'hamburg',
        rhs: 'berlin'
      }
    ]);
  });
});

