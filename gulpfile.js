'use strict';

var gulp = require('gulp');
var lint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var path = ['*.js', 'lib/*.js', 'test/*.js'];


gulp.task('test', function(){
  return gulp.src('/test/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('lint', function(){
  return gulp.src(path)
    .pipe(lint())
    .pipe(lint.format());
});

gulp.task('watch', function(){
  gulp.watch(path, ['test', 'lint']);
});

gulp.task('default', ['lint', 'test', 'watch']);
