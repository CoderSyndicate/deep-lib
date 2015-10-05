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
