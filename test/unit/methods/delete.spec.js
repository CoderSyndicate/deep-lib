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

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - delete ', function() {
  var clone = deep.clone(data);

  it('should delete a deep value', function() {
    var value   = deep.delete(clone, 'countries.germany.towns.capital');
    var control = deep.select(clone, 'countries.germany.towns.capital');

    expect(value).to.equal('berlin');
    expect(control).to.equal(undefined);
  });

  it('should delete an array element', function() {
    var value   = deep.delete(clone, 'countries.spain.sites.0');
    var control = deep.select(clone, 'countries.spain.sites.0');

    expect(value).to.equal('Alhambra');
    expect(control).to.equal('Cabo de Gata');
  });

  it('should return deep structures', function() {
    var value   = deep.delete(clone, 'countries.germany.towns');
    var control = deep.select(clone, 'countries.germany.towns');

    expect(value).to.deep.equal({
      "berlin": {
        "name": "Berlin",
        "population": 3562166,
        "area": 891.85
      },
      "hamburg": {
        "name": "Hamburg",
        "population": 1751775,
        "area": 755
      }
    });

    expect(control).to.equal(undefined);
  });

  it('should return undefined for unknown deep values', function() {
    var levels = ['fully', 'unknown', 'deep', 'value'];
    levels.forEach(function (level, index) {
      var path  = levels.slice(0, index + 1).join('.');
      var value   = deep.delete(clone, path);

      expect(value).to.equal(undefined);
    });
  });
});
