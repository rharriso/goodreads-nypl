var gulp        = require("gulp");
var gls         = require('gulp-live-server');
var sourcemaps  = require('gulp-sourcemaps');
var browserify  = require('gulp-browserify');
var react       = require('gulp-react');
var babel       = require('gulp-babel');
var gutil       = require('gulp-util');

var livereload = require('gulp-livereload');

var paths = {
    client: ["./client-src/**/*.js"],
    server: ["./server/**/*", "index.js"] 
};

gulp.task('scripts', function(){
   gulp.src('./client-src/app.js') 
        .on('error', gutil.log) 
        .pipe(sourcemaps.init())
        .pipe(babel({
          presets: ["es2015", "react"]
        }).on('error', gutil.log))
        .pipe(browserify({
          debug : !gulp.env.production
        }).on('error', gutil.log))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./client/js'))
        .pipe(livereload({start: true, port: 8081}));
});

/*
    Serve client and server files
*/
gulp.task('serve', ['scripts'], function() {
  var server = gls.new("index.js", {env: {NODE_ENV: 'development'}});
  server.start();
  
  livereload.listen({port: 8081});
   
  gulp.watch(paths.client, ['scripts']);
  gulp.watch(paths.server, function(file){
    server.start();  
    server.notify(file);  
  });
});