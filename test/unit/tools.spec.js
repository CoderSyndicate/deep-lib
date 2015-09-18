/* jshint node:true */
/* jshint expr:true*/
/* global require */
/* global process */
/* global describe */
/* global after */
/* global it */
"use strict";

var should   = require('chai').should();
var expect   = require('chai').expect;
var deep     = require('../../lib/deep-lib');
var data     = require('../object.json');


describe('[' + __filename.substring(__filename.indexOf('/test/') + 1) + '] - isArray ', function() {
    var clone = deep.clone(data);

});
