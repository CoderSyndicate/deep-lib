var should   = require('chai').should();
var expect   = require('chai').expect;
var deep     = require('../../lib/deep-lib');
var data     = require('../object.json');

describe('[' + require('path').basename(__filename) + '] - clone ', function() {
  var clone = deep.clone(data);

  it('should not have the same object reference', function() {
    expect(clone).to.not.equal(data);
  });

  it('should have the same structure', function() {
    expect(clone).to.deep.equal(data);
  });

  it('should not change source object', function() {
    clone.countries.germany.towns.capital = 'hamburg';

    expect(clone.countries.germany.towns.capital).to.not.equal(data.countries.germany.towns.capital);
    expect(data.countries.germany.towns.capital).to.equal('berlin');
  });

  it('should work with substructures', function() {
    var clone = deep.clone(data, 'countries.germany');
    expect(clone).to.deep.equal(data.countries.germany);
  });
});

describe('[' + require('path').basename(__filename) + '] - get ', function() {
  var clone = deep.clone(data);

  it('should return a deep value', function() {
    var capital = deep.get(clone, 'countries.germany.towns.capital');
    expect(capital).to.equal('berlin');
  });

  it('should return a deep array element', function() {
    var capital = deep.get(clone, 'countries.spain.sites.0');
    expect(capital).to.equal('Alhambra');
  });

  it('should return a deep value in an array element', function() {
    var capital = deep.get(clone, 'countries.spain.towns.0.name');
    expect(capital).to.equal('Madrid');
  });

  it('should return deep structures', function() {
    var levels = ['countries', 'germany', 'towns', 'capital'];

    levels.forEach(function (level, index) {
      var path    = levels.slice(0, index + 1).join('.');

      var value   = deep.get(clone, path);
      var control = deep.get(data, path);

      expect(value).to.deep.equal(control);
    });
  });

  it('should return undefined for unknown deep values', function() {
    var levels = ['fully', 'unknown', 'deep', 'value'];
    levels.forEach(function (level, index) {
      var path  = levels.slice(0, index + 1).join('.');
      var value = deep.get(clone, path);

      expect(value).to.equal(undefined);
    });
  });
});

describe('[' + require('path').basename(__filename) + '] - add ', function() {
  var clone = deep.clone(data);
  var paris = {
    "name": "Paris",
    "population": 3562166,
    "area": 891.85
  };

  it('should replace a deep value', function() {
    deep.add(clone, 'countries.germany.towns.capital', 'hamburg');
    var control = deep.get(clone, 'countries.germany.towns.capital');

    expect(control).to.equal('hamburg');
  });

  it('should add a deep value', function() {
    deep.add(clone, 'countries.france.towns.capital', 'paris');
    var control = deep.get(clone, 'countries.france.towns.capital');

    expect(control).to.equal('paris');
  });

  it('should add a root value', function() {
    deep.add(clone, 'continents', ['europa']);

    expect(clone.continents).to.deep.equal(['europa']);
  });

  it('should add a deep value in an array', function() {
    deep.add(clone, 'countries.spain.sites.2', 'Gibraltar');
    var control = deep.get(clone, 'countries.spain.sites.2');

    expect(control).to.equal('Gibraltar');
  });

  it('should add a deep value in an array element', function() {
    deep.add(clone, 'countries.spain.towns.0.website', 'http://www.madrid.es');
    var control = deep.get(clone, 'countries.spain.towns.0.website');

    expect(control).to.equal('http://www.madrid.es');
  });

  it('should create an array element to add a value', function() {
    deep.add(clone, 'countries.spain.towns.2.website', 'http://www.madrid.es');
    var control = deep.get(clone, 'countries.spain.towns.2.website');

    expect(control).to.equal('http://www.madrid.es');
  });

  it('should create an array to add an element', function() {
    deep.add(clone, 'countries.spain.array.0', 'sometest');
    var control = deep.get(clone, 'countries.spain.array.0');

    expect(control).to.equal('sometest');
  });

  it('should create an array to add an object element property value', function() {
    deep.add(clone, 'countries.spain.receipts.0.name', 'Paella');
    var control = deep.get(clone, 'countries.spain.receipts.0.name');

    expect(control).to.equal('Paella');
  });

  it('should add a deep structure', function() {
    deep.add(clone, 'countries.france.towns.paris', paris);
    var control = deep.get(clone, 'countries.france.towns.paris');

    expect(control).to.equal(paris);
  });

  it('should ignore undefined values and no substructure created', function() {
    deep.add(clone, 'countries.portugal');
    var control = deep.get(clone, 'countries.portugal.towns');

    expect(control).to.equal(undefined);
  });
});

describe('[' + require('path').basename(__filename) + '] - delete ', function() {
  var clone = deep.clone(data);

  it('should delete a deep value', function() {
    var value   = deep.delete(clone, 'countries.germany.towns.capital');
    var control = deep.get(clone, 'countries.germany.towns.capital');

    expect(value).to.equal('berlin');
    expect(control).to.equal(undefined);
  });

  it('should delete an array element', function() {
    var value   = deep.delete(clone, 'countries.spain.sites.0');
    var control = deep.get(clone, 'countries.spain.sites.0');

    expect(value).to.equal('Alhambra');
    expect(control).to.equal('Cabo de Gata');
  });

  it('should return deep structures', function() {
    var value   = deep.delete(clone, 'countries.germany.towns');
    var control = deep.get(clone, 'countries.germany.towns');

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

describe('[' + require('path').basename(__filename) + '] - move ', function() {
  var clone = deep.clone(data);

  it('should move a deep structure', function() {
    var oldPath = 'countries.germany';
    var newPath = 'countries.france';

    var moved = deep.get(clone, oldPath);

    deep.move(clone, oldPath, newPath);
    var empty   = deep.get(clone, oldPath);
    var control = deep.get(clone, newPath);
    var value   = deep.get(data, oldPath);

    expect(empty).to.equal(undefined);
    expect(control).to.deep.equal(value);
    expect(control).to.equal(moved);
  });

  it('should move an array element to a different array', function() {
    var oldPath = 'countries.spain.sites.0';
    var newPath = 'countries.france.sites.0';

    var moved = deep.get(clone, oldPath);

    deep.move(clone, oldPath, newPath);
    var nextElement = deep.get(clone, oldPath);
    var control     = deep.get(clone, newPath);
    var original    = deep.get(data, oldPath);

    expect(nextElement).to.equal('Cabo de Gata');
    expect(control).to.deep.equal(original);
    expect(control).to.equal(moved);
  });

  it('should move an array element to an object', function() {
    var oldPath = 'countries.spain.sites.0';
    var newPath = 'countries.spain.bestSite';

    var moved = deep.get(clone, oldPath);

    deep.move(clone, oldPath, newPath);
    var empty   = deep.get(clone, oldPath);
    var control = deep.get(clone, newPath);

    expect(empty).to.equal(undefined);
    expect(control).to.equal(moved);
  });

  it('should move a deep value', function() {
    deep.add(clone, 'countries.france.towns.capital', 'hamburg');
    var control = deep.get(clone, 'countries.france.towns.capital');


    expect(control).to.equal('hamburg');
  });
});

describe('[' + require('path').basename(__filename) + '] - equal ', function() {
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
    deep.add(clone, 'countries.france.towns.capital', 'hamburg');

    var areEqual = deep.equal(clone, data);
    expect(areEqual).to.equal(false);
  });

  it('should find data and changed substructure unequal', function() {
    deep.add(clone, 'countries.france.towns.capital', 'paris');

    var areEqual = deep.equal(clone, data, 'countries.france');
    expect(areEqual).to.equal(false);
  });
});

describe('[' + require('path').basename(__filename) + '] - same ', function() {
  var clone = deep.clone(data);

  it('should find data and clone not equal, because not identical', function() {

    var areEqual = deep.same(clone, data);
    expect(areEqual).to.equal(false);
  });

  it('should find data identical to itself', function() {

    var areEqual = deep.same(data, data);
    expect(areEqual).to.equal(true);
  });

  it('should find germany identical to itself', function() {

    var areEqual = deep.same(clone, clone, 'countries.germany');
    expect(areEqual).to.equal(true);
  });
});

describe('[' + require('path').basename(__filename) + '] - diff ', function() {
  var clone = deep.clone(data);

  it('should find no diff between data and clone', function() {

    var diff = deep.diff(clone, data);
    expect(diff).to.equal(undefined);
  });

  it('should return differences between data and changed', function() {
    deep.add(clone, 'countries.germany.towns.capital', 'hamburg');

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

describe('[' + require('path').basename(__filename) + '] - getPaths ', function() {
  var clone = deep.clone(data);

  it('should find no diff between data and clone', function() {

    var paths = deep.getPaths(clone);
    expect(paths).to.deep.equal([
      'countries.germany.towns.capital',
      'countries.germany.towns.berlin.name',
      'countries.germany.towns.berlin.population',
      'countries.germany.towns.berlin.area',
      'countries.germany.towns.hamburg.name',
      'countries.germany.towns.hamburg.population',
      'countries.germany.towns.hamburg.area',
      'countries.spain.sites.0',
      'countries.spain.sites.1',
      'countries.spain.capital',
      'countries.spain.towns.0.name',
      'countries.spain.towns.0.population',
      'countries.spain.towns.0.area',
      'countries.spain.towns.1.name',
      'countries.spain.towns.1.population',
      'countries.spain.towns.1.area'
    ]);
  });
});

describe('[' + require('path').basename(__filename) + '] - select ', function() {
  var clone = deep.clone(data);

  it('should return only value paths ending with "name": /.*\\.name$/', function() {

    var paths = deep.select(clone, /.*\.name$/);

    expect(paths).to.deep.equal([
      'countries.germany.towns.berlin.name',
      'countries.germany.towns.hamburg.name',
      'countries.spain.towns.0.name',
      'countries.spain.towns.1.name'
    ]);
  });

  it('should return only value paths ending with "name" from substructure: /.*\\.name$/', function() {

    var paths = deep.select(clone, /.*\.name$/, 'countries.germany');

    expect(paths).to.deep.equal([
      'towns.berlin.name',
      'towns.hamburg.name'
    ]);
  });
});
