/* jshint node:true */
/* jshint expr:true*/
/* global require */
/* global process */
/* global describe */
/* global after */
/* global it */
"use strict";

var should    = require('chai').should();
var expect    = require('chai').expect;
var tools     = require('../../lib/tools');

var testPath  = 'root' + tools.sep + 'depth1' + tools.sep + 'depth2' + tools.sep + 'property';


describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - split ', function() {

    it('should return an empty array if no path was provided', function() {
        var result = tools.split();

        expect(result).to.deep.equal([]);
    });

    it('should an array with the path elements', function() {
        var result = tools.split(testPath);

        expect(result.length).to.equal(4);
    });
});

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - join ', function() {

    it('should join path elements', function() {
        var array  = tools.split(testPath);
        var result = tools.join(array);

        expect(result).to.equal(testPath);
    });
});

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - dirname ', function() {

    it('should return the path argument if it has no depth', function() {
        var result = tools.dirname('root');

        expect(result).to.equal('root');
    });

    it('should return path string without last depth', function() {
        var result    = tools.dirname(testPath);
        var pathArray = tools.split(testPath).slice(0, 3);

        expect(result).to.equal(tools.join(pathArray));
    });
});

describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - basename ', function() {

    it('should return the path argument if it has no depth', function() {
        var result = tools.basename('root');

        expect(result).to.equal('root');
    });

    it('should return last depth', function() {
        var result      = tools.basename(testPath);
        var pathArray   = tools.split(testPath);
        var lastElement = pathArray[pathArray.length - 1];

        expect(result).to.equal(lastElement);
    });
});
