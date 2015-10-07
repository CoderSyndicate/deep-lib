/* jshint node:true */
/* jshint expr:true*/
/* global __filename */
/* global require */
/* global process */
/* global describe */
/* global after */
/* global it */
"use strict";

var expect    = require('chai').expect;
var tools     = require('../../lib/tools');

var testPath  = 'root' + tools.sep + 'depth1' + tools.sep + 'depth2' + tools.sep + 'property';

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - method ', function() {

  describe('split ', function() {

    it('should return an empty array if no path was provided', function() {
      var result = tools.split();

      expect(result).to.deep.equal([]);
    });

    it('should an array with the path elements', function() {
      var result = tools.split(testPath);

      expect(result.length).to.equal(4);
    });
  });

  describe('join ', function() {

    it('should join path elements', function() {
      var array  = tools.split(testPath);
      var result = tools.join(array);

      expect(result).to.equal(testPath);
    });
  });

  describe('isObject ', function() {

    it('should return true for {}', function() {
      var result = tools.isObject({});

      expect(result).to.equal(true);
    });

    it('should return true for []', function() {
      var result = tools.isObject([]);

      expect(result).to.equal(true);
    });

    it('should return false for null', function() {
      var result = tools.isObject(null);

      expect(result).to.equal(false);
    });

    it('should return false for undefined', function() {
      var result = tools.isObject(undefined);

      expect(result).to.equal(false);
    });
  });

  describe('isArrayIndex ', function() {

    it('should return push (truthy) for ' + tools.arrayPlaceholder, function() {
      var result = tools.isArrayIndex(tools.arrayPlaceholder);

      expect(result).to.equal('push');
    });

    it('should return push (truthy) for ' + tools.arrayPush, function() {
      var result = tools.isArrayIndex(tools.arrayPush);

      expect(result).to.equal('push');
    });

    it('should return pop (truthy) for ' + tools.arrayPop, function() {
      var result = tools.isArrayIndex(tools.arrayPop);

      expect(result).to.equal('pop');
    });

    it('should return true for a integer', function() {
      var result = tools.isArrayIndex(12);

      expect(result).to.equal(true);
    });

    it('should return false for 4try', function() {
      var result = tools.isArrayIndex('4try');

      expect(result).to.equal(false);
    });

    it('should return false for 23-54', function() {
      var result = tools.isArrayIndex('23-54');

      expect(result).to.equal(false);
    });
  });

  describe('pathIncludesArrayWildcards ', function() {

    it('should return true for bar.' + tools.arrayPlaceholder, function() {
      var result = tools.pathIncludesArrayWildcards('bar.'+tools.arrayPlaceholder);

      expect(result).to.equal(true);
    });

    it('should return true for bar.' + tools.arrayPush, function() {
      var result = tools.pathIncludesArrayWildcards('bar.'+tools.arrayPush);

      expect(result).to.equal(true);
    });

    it('should return true for bar.' + tools.arrayPop, function() {
      var result = tools.pathIncludesArrayWildcards('bar.'+tools.arrayPop);

      expect(result).to.equal(true);
    });

    it('should return false for bar.0', function() {
      var result = tools.pathIncludesArrayWildcards('bar.0');

      expect(result).to.equal(false);
    });

    it('should return false for 0.bar.0', function() {
      var result = tools.pathIncludesArrayWildcards('0.bar.0');

      expect(result).to.equal(false);
    });

    it('should return false for bar.foo.4', function() {
      var result = tools.pathIncludesArrayWildcards('bar.foo.4');

      expect(result).to.equal(false);
    });
  });

  describe('parent ', function() {

    it('should return null if it has no depth', function() {
      var result = tools.parent('root');

      expect(result).to.equal(null);
    });

    it('should return path string without last depth', function() {
      var result    = tools.parent(testPath);
      var pathArray = tools.split(testPath).slice(0, 3);

      expect(result).to.equal(tools.join(pathArray));
    });
  });

  describe('areIdentical ', function() {
    var clone = {bla: {bla: 'bla'}};
    var data  = {bla: {bla: 'bla'}};

    it('should find data and clone not equal, because not identical', function() {

      var areEqual = tools.areIdentical(clone, data);
      expect(areEqual).to.equal(false);
    });

    it('should find data identical to itself', function() {

      var areEqual = tools.areIdentical(data, data);
      expect(areEqual).to.equal(true);
    });

    it('should find germany identical to itself', function() {

      var areEqual = tools.areIdentical(clone, clone, 'countries.germany');
      expect(areEqual).to.equal(true);
    });
  });

  describe('property ', function() {

    it('should return the path argument if it has no depth', function() {
      var result = tools.property('root');

      expect(result).to.equal('root');
    });

    it('should return last depth', function() {
      var result      = tools.property(testPath);
      var pathArray   = tools.split(testPath);
      var lastElement = pathArray[pathArray.length - 1];

      expect(result).to.equal(lastElement);
    });
  });
});
