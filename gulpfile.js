'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	babel = require('gulp-babel'),
	electron = require('electron-prebuilt'),
	childProcess = require('child_process');

gulp.task('app', function() {
	gulp.src('source/index.html')
		.pipe(gulp.dest('build/'));
	gulp.src('source/index.js')
		.pipe(gulp.dest('build/'));
	gulp.src('source/search.html')
			.pipe(gulp.dest('build/'));
		gulp.src('source/search.js')
			.pipe(gulp.dest('build/'));
});

gulp.task('babel', function() {
	return gulp.src(['source/**/*.js', 'source/**/*.jsx'])
		.pipe(babel({
			presets: ['es2015', 'react']
		}))
		.pipe(gulp.dest('build'));
});

//TODO probably a better way to insert these dependencies
gulp.task('foundation', function() {
	return gulp.src('node_modules/foundation-sites/dist/*.min.*')
		.pipe(gulp.dest('build/vendor'));
});

gulp.task('jquery', function() {
	return gulp.src('node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('build/vendor'));
});

gulp.task('fonts', function() {
	gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('build/vendor'));
	gulp.src('node_modules/font-awesome/fonts/*.*')
		.pipe(gulp.dest('build/fonts'));
});

gulp.task('wavesurfer', function() {
	return gulp.src('wavesurfer.js/dist/wavesurfer.cjs.js')
		.pipe(gulp.dest('build/vendor'));
});

gulp.task('knob', function() {
	gulp.src('node_modules/jquery-knob/dist/jquery.knob.min.js')
		.pipe(gulp.dest('build/vendor'));
});

gulp.task('sass', function() {
	gulp.src('source/**/*.scss')
		.pipe(sass())
		.pipe(concat('app.css'))
		.pipe(gulp.dest('build/css'))
});

gulp.task('watch', function() {
	gulp.watch(['source/**/*.jsx', 'source/**/*.js'], ['babel']);
	gulp.watch(['source/**/*.scss'], ['sass']);
	gulp.watch(['source/index.html'], ['app']);
});


gulp.task('electron', ['watch', 'app', 'foundation', 'jquery', 'fonts', 'wavesurfer', 'knob',  'sass', 'babel'], function() {
	childProcess.spawn(electron, ['build/'], {
		stdio: 'inherit'
	});
});

gulp.task('run', ['electron']);
