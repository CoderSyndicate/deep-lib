/* jshint node:true */
/* jshint expr:true*/
/* global require */
'use strict';

var gulp = require('gulpfile.basics');

var fs = require("fs");
var gutil = require("gulp-util");
var gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
var concat = require("gulp-concat");

gulp.task("docs", function() {
  return gulp.src("lib/**/*.js")
    .pipe(concat("all.md"))
    .pipe(gulpJsdoc2md({}))
    .on("error", function(err){
      gutil.log("jsdoc2md failed:", err.message);
    })
    .pipe(gulp.dest("api"));
});
