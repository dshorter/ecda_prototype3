var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var minify = require('gulp-minify');
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
        .pipe(gulp.dest('dest'));
});

gulp.task('compress', function () {
    gulp.src('*.*')
        .pipe(minify({
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist'))
});