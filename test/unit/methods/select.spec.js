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

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - select ', function() {
  var clone = deep.clone(data);

  it('should return a deep value', function() {
    var capital = deep.select(clone, 'countries.germany.towns.capital');
    expect(capital).to.equal('berlin');
  });

  it('should return a deep array element', function() {
    var capital = deep.select(clone, 'countries.spain.sites.0');
    expect(capital).to.equal('Alhambra');
  });

  it('should return a deep value in an array element', function() {
    var capital = deep.select(clone, 'countries.spain.towns.0.name');
    expect(capital).to.equal('Madrid');
  });

  it('should return deep structures', function() {
    var levels = ['countries', 'germany', 'towns', 'capital'];

    levels.forEach(function (level, index) {
      var path    = levels.slice(0, index + 1).join('.');

      var value   = deep.select(clone, path);
      var control = deep.select(data, path);

      expect(value).to.deep.equal(control);
    });
  });

  it('should return undefined for unknown deep values', function() {
    var levels = ['fully', 'unknown', 'deep', 'value'];
    levels.forEach(function (level, index) {
      var path  = levels.slice(0, index + 1).join('.');
      var value = deep.select(clone, path);

      expect(value).to.equal(undefined);
    });
  });
});
