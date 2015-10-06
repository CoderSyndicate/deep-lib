/* jshint node:true */
/* jshint expr:true*/
/* global require */
/* global process */
/* global describe */
/* global after */
/* global it */
"use strict";

var expect     = require('chai').expect;
var diffLib    = require('deep-diff');
var deep       = require('../../../lib/deep-lib');
var tools      = require('../../../lib/tools');
var data       = require('../../object.json');
var pathTests  = require('../../paths.json');

var createPath = require('../../../lib/methods/createPath').createPath;

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - createPath ', function() {

  // iterate through all the path tests
  pathTests.forEach(function testIterator (test) {
    if (test.type === 'create') {
      // only interested in create tests

      it('should ' + test.description+ ': ' + test.path , function() {

        // clone test data to be able to compare
        var clone = deep.clone(data);

        if (typeof test.pathResult === 'string') {
          expect(deep.createPath.bind(this, clone, test.path, test.offset)).to.throw(test.value);
        }
        else {

          var realPath = deep.createPath(clone, test.path, test.force, test.offset);

          var diff = diffLib(data, clone);

          if (false) {
            console.log('diff: ',JSON.stringify(diff));
            console.log('result: ',realPath,' = ', deep.select(clone, realPath));
          }

          expect(clone).to.not.deep.equal(data);
          expect(diff).to.deep.equal(test.pathResult);
          expect(realPath).to.deep.equal(test.realPath);
        }
      });
    }
  });
});
