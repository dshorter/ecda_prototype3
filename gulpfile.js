
var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var jshint = require('gulp-jshint');
var minifyInline = require('gulp-minify-inline');

gulp.task('default', function () {
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

gulp.task('lint', function () {
    return gulp.src('*.*')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});





