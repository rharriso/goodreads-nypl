var gulp        = require("gulp");
var gls         = require('gulp-live-server');
var sourcemaps  = require('gulp-sourcemaps');
var browserify  = require('browserify');
var babel       = require('babelify');
var gulpUtil    = require('gulp-util');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var reactify    = require('reactify');
var rename      = require('gulp-rename');
var nodemon 		= require('gulp-nodemon');
var replace 		= require('stream-replace');

var livereload = require('gulp-livereload');

var paths = {
  clientSrc: ["./client-src/**/*.js"],
  server: ["./server/**/*", "index.js"] 
};

gulp.task('scripts', function(){

  var b = browserify({
    debug: true,
    sourceMaps: true,
    entries: "./client-src/app.js" 
  }).transform(babel, {presets: ["es2015", "react"]})
    .transform(reactify);

  b.bundle() 
    .on('error', gulpUtil.log)
    .pipe(source("./client-src/app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(rename({dirname: ''}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./client/js/"))
    .pipe(livereload({start: true, port: 8081}));
});

gulp.task('scripts-watch', ['scripts'], function(){
  gulp.watch(paths.clientSrc, ['scripts']);
});

/*
    Serve client and server files
    */
gulp.task('serve', ['scripts-watch'], function() {
  var monitor = nodemon({
    exec: 'node-inspector & node --debug',
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
    this.stdout.pipe(replace(/\\n/igm, '\n')).pipe(process.stdout);
    this.stderr.pipe(replace(/\\n/igm, '\n')).pipe(process.stderr);
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
