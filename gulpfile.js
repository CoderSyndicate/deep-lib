/* jshint node:true */
/* jshint expr:true*/
/* global require */
'use strict';

var gulp = require('gulpfile.basics');

var fs = require("fs");
var gutil = require("gulp-util");
var gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
var rename = require("gulp-rename");
var concat = require("gulp-concat");

gulp.task("docs", function(){
  return gulp.src("lib/*.js")
    .pipe(gulpJsdoc2md({}))
    .on("error", function(err){
      gutil.log(gutil.colors.red("jsdoc2md failed"), err.message)
    })
    .pipe(rename(function(path){
      path.extname = ".md";
    }))
    .pipe(gulp.dest("api"));
});