/* jshint node:true */
/* jshint expr:true*/
/* global require */
/* global process */
/* global describe */
/* global after */
/* global it */
"use strict";

var expect   = require('chai').expect;
var diffLib  = require('deep-diff');
var deep     = require('../../../lib/deep-lib');
var data     = require('../../object.json');

var defineProperty = require('../../../lib/methods/defineProperty').defineProperty;

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - defineProperty ', function() {
  it('should do nothing if provided value is undefined', function() {
    var clone = deep.clone(data);

    defineProperty(clone, 'propOnRoot');
    expect(clone).to.deep.equal(data);
  });

  it('should create root properties: propOnRoot', function() {
    var clone = deep.clone(data);
    var value = 'worked!';

    defineProperty(clone, 'propOnRoot', value, {
      enumerable:   true // otherwise not visible to diff
    });

    var diff = diffLib(data, clone);

    expect(clone).to.not.deep.equal(data);
    expect(diff).to.deep.equal([ { kind: 'N', path: [ 'propOnRoot' ], rhs: value } ]);
    expect(clone.propOnRoot).to.equal(value);
  });

  it('should create deep properties with default options: root.depth1.0.property', function() {
    var clone = deep.clone(data);

    defineProperty(clone, 'root.depth1.0.property', 'worked!');

    var diff = diffLib(data, clone);

    expect(clone).to.not.deep.equal(data);
    expect(diff).to.deep.equal(
      [{"kind":"N","path":["root"],"rhs":{"depth1":[{"property":"worked!"}]}}]
    );
  });

  it('should create deep properties: root.depth1.0.property', function() {
    var clone = deep.clone(data);

    defineProperty(clone, 'root.depth1.0.property', 'worked!', {
      enumerable:   true // otherwise not visible to diff
    });

    var diff = diffLib(data, clone);

    expect(clone).to.not.deep.equal(data);
    expect(diff).to.deep.equal(
      [{"kind":"N","path":["root"],"rhs":{"depth1":[{"property":"worked!"}]}}]
    );
  });

  it('should create deep properties using a rebased root: property in countries.germany', function() {
    var clone = deep.clone(data);

    defineProperty(clone, 'property', 'worked!', 'countries.germany');

    var diff = diffLib(data, clone);

    expect(clone).to.not.deep.equal(data);
    expect(diff).to.deep.equal(
      [{"kind":"N","path":["countries","germany","property"],"rhs":"worked!"}]
    );
  });
});
