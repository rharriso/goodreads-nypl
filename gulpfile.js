var gulp        = require("gulp");
var gls         = require('gulp-live-server');
var sourcemaps  = require('gulp-sourcemaps');
var browserify  = require('browserify');
var babel       = require('babelify');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var reactify    = require('reactify');
var rename      = require('gulp-rename');

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
    .on('error', gutil.log)
    .pipe(source("./client-src/app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(rename({dirname: ''}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./client/js/"))
    .pipe(livereload({start: true, port: 8081}));
});

/*
    Serve client and server files
*/
gulp.task('serve', ['scripts'], function() {
  var server = gls.new("index.js", {env: {NODE_ENV: 'development'}});
  server.start();
  
  livereload.listen({port: 8081});
   
  gulp.watch(paths.clientSrc, ['scripts']);
  gulp.watch(paths.server, function(file){
    server.start();  
    server.notify(file);  
  });
});