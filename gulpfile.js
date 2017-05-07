var gulp        = require("gulp");
var gulpUtil    = require('gulp-util');
var nodemon 		= require('gulp-nodemon');
var replace 		= require('stream-replace');
var webpack     = require('gulp-webpack');
var webpackConfig = require('./webpack.config');

var livereload = require('gulp-livereload');

var paths = {
  clientSrc: ['./client-src/**/*'],
  server: ['./server/**/*", "index.js'] 
};

gulp.task('scripts', function(){
  webpack(webpackConfig)
    .pipe(gulp.dest('client/'));
});

gulp.task('scripts-watch', ['scripts'], function(){
  gulp.watch(paths.clientSrc, ['scripts']);
});

/*
    Serve client and server files
    */
gulp.task('serve', ['scripts-watch'], function() {
  var monitor = nodemon({
    exec: 'node --inspect',
    script: './index.js',
    ext: 'js jsx html',
    watch: ['index.js'],
    delay: 2000,
    debug: true,
    stdout: false,
    readable: false,
    verbose: true
  });

  monitor.on('readable', function (){
    const NEWLINE_REPLACE = /\\n/igm;
    this.stdout.pipe(replace(NEWLINE_REPLACE, '\n')).pipe(process.stdout);
    this.stderr.pipe(replace(NEWLINE_REPLACE, '\n')).pipe(process.stderr);
  });

  // @NOTE: (pg 25.Dec.2015) - avoid errors during shutdown:
  process.once('exit', function () {
    gulpUtil.log(gulpUtil.colors.cyan('\'nodemon\''), 'handle process exit');
    monitor.emit('exit');
  });

  process.once('SIGINT', function () {
    gulpUtil.log(gulpUtil.colors.cyan('\'nodemon\''), 'handle SIGINT');
    process.exit(1);
  });

  livereload.listen({port: 8081});
});
