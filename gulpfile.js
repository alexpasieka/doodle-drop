// import gulp libraries
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

// transpiles all client-side ES6 to ES5 using babel
gulp.task('transpile', () => {
  gulp.src('./client/*.js')
		.pipe(babel({ presets: ['env', 'react'] }))
		.pipe(gulp.dest('./hosted'));
});

// lints through all server-side JavaScript
gulp.task('lint', () => {
  gulp.src(['./server/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// builds transpiled and linted code
gulp.task('build', () => {
	gulp.start('transpile');
	gulp.start('lint');
});

// restarts server any time a change in client-side JavaScript is detected
gulp.task('watch', () => {
  gulp.watch('./client/*.js', ['transpile']);
  nodemon({ script: './server/app.js', ext: 'js', tasks: ['lint'] });
});
