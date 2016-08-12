var gulp = require('gulp');
var bower = require('gulp-bower');
var vulcanize = require('gulp-vulcanize');
var polylint = require('gulp-polylint');
var minifyInline = require('gulp-minify-inline');
var jshint = require('gulp-jshint');


gulp.task('polylint', function () {
    return gulp.src('ecda-*.html')
        .pipe(polylint())
        .pipe(polylint.reporter(polylint.reporter.stylishlike));
});

gulp.task('default', ['bower_update'], function () {
    return gulp.src('start.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false,
            inlineScripts: true,
            inlineCss: true,
            stripComments: true
        }))
        .pipe(minifyInline())
        .pipe(gulp.dest('ecda_release'));
});

gulp.task('bower_update', function () {
    return bower({cmd: 'update'});
});

gulp.task('lint', function () {
    return gulp.src('*.*')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('ecda_release'));
});





