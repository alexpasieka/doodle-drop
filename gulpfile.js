// import gulp libraries
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

// compiles all Sass files into CSS
gulp.task('sass', () => {
  gulp.src('./client/style/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./hosted/style/'));
});

// transpiles all client-side ES6 to ES5 using babel
gulp.task('transpile', () => {
  gulp.src('./client/src/*.js')
		.pipe(babel({ presets: ['env', 'react'] }))
		.pipe(gulp.dest('./hosted/src'));
});

// lints through all server-side JavaScript
gulp.task('lint', () => {
  gulp.src(['./server/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// builds CSS and transpiles linted JavaScript
gulp.task('build', () => {
  gulp.start('sass');
  gulp.start('transpile');
  gulp.start('lint');
});

// restarts server any time a change in client-side JavaScript or CSS is detected
gulp.task('watch', () => {
  gulp.watch('./client/style/*.scss', ['sass']); // TODO: why is it not watching for Sass changes?
  gulp.watch('./client/src/*.js', ['transpile']);
  nodemon({ script: './server/app.js', ext: 'js', tasks: ['lint'] });
});
