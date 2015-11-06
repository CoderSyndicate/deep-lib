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

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - move ', function() {

  it('should move a deep structure', function() {
    var clone = deep.clone(data);

    var oldPath = 'countries.germany';
    var newPath = 'countries.france';

    deep.move(clone, oldPath, newPath);

    var diff = diffLib(data, clone);

    expect(clone).to.not.deep.equal(data);
    expect(diff).to.deep.equal([{"kind":"D","path":["countries","germany"],"lhs":{"towns":{"capital":"berlin","berlin":{"name":"Berlin","population":3562166,"area":891.85},"hamburg":{"name":"Hamburg","population":1751775,"area":755}}}},{"kind":"N","path":["countries","france"],"rhs":{"towns":{"capital":"berlin","berlin":{"name":"Berlin","population":3562166,"area":891.85},"hamburg":{"name":"Hamburg","population":1751775,"area":755}}}}]);
  });

  it('should move an array element to a different array', function() {
    var clone = deep.clone(data);

    var oldPath = 'countries.spain.sites.0';
    var newPath = 'countries.france.sites.0';

    deep.move(clone, oldPath, newPath);

    var diff = diffLib(data, clone);

    expect(clone).to.not.deep.equal(data);
    expect(diff).to.deep.equal([{"kind":"E","path":["countries","spain","sites",0],"lhs":"Alhambra","rhs":"Cabo de Gata"},{"kind":"A","path":["countries","spain","sites"],"index":1,"item":{"kind":"D","lhs":"Cabo de Gata"}},{"kind":"N","path":["countries","france"],"rhs":{"sites":["Alhambra"]}}]);
  });

  it('should move an array element to an object', function() {
    var clone = deep.clone(data);

    var oldPath = 'countries.spain.sites.0';
    var newPath = 'countries.spain.bestSite';

    deep.move(clone, oldPath, newPath);

    var diff = diffLib(data, clone);

    expect(clone).to.not.deep.equal(data);
    expect(diff).to.deep.equal([{"kind":"E","path":["countries","spain","sites",0],"lhs":"Alhambra","rhs":"Cabo de Gata"},{"kind":"A","path":["countries","spain","sites"],"index":1,"item":{"kind":"D","lhs":"Cabo de Gata"}},{"kind":"N","path":["countries","spain","bestSite"],"rhs":"Alhambra"}]);
  });

  it('should move a deep value', function() {
    var clone = deep.clone(data);

    var oldPath = 'countries.germany.towns.capital';
    var newPath = 'countries.france.towns.capital';

    deep.move(clone, oldPath, newPath);

    var diff = diffLib(data, clone);

    expect(clone).to.not.deep.equal(data);
    expect(diff).to.deep.equal([{"kind":"D","path":["countries","germany","towns","capital"],"lhs":"berlin"},{"kind":"N","path":["countries","france"],"rhs":{"towns":{"capital":"berlin"}}}]);
  });

  it('should do nothing if "oldPath" does not exist', function() {
    var clone = deep.clone(data);

    var oldPath = 'countries.usa';
    var newPath = 'countries.france.towns.capital';

    deep.move(clone, oldPath, newPath);

    expect(clone).to.deep.equal(data);
  });

  it('should support the "offset" argument', function() {
    var clone = deep.clone(data);

    var oldPath = 'spain.sites.0';
    var newPath = 'spain.bestSite';

    deep.move(clone, oldPath, newPath, 'countries');

    var diff = diffLib(data, clone);

    expect(clone).to.not.deep.equal(data);
    expect(diff).to.deep.equal([{"kind":"E","path":["countries","spain","sites",0],"lhs":"Alhambra","rhs":"Cabo de Gata"},{"kind":"A","path":["countries","spain","sites"],"index":1,"item":{"kind":"D","lhs":"Cabo de Gata"}},{"kind":"N","path":["countries","spain","bestSite"],"rhs":"Alhambra"}]);
  });
});
