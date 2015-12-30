var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

gulp.task('webpack-dev-server', function() {
  new WebpackDevServer(webpack(config), {
    // server and middleware options
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: true
  }).listen(3000, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);

    // server listening
    gutil.log('Listening at localhost:3000');
  });
});

// Activate virtualenv (using virtualenvwrapper) and start django-extensions server
gulp.task('django-server', function() {
  var proc = exec('workon ffd-dev && python manage.py runserver_plus');

  // Pipe django server output to console
  proc.stderr.on('data', function(data) {
    process.stdout.write(data);
  });
  proc.stdout.on('data', function(data) {
    process.stdout.write(data);
  });
});

gulp.task('browser-sync', function() {
  browserSync.init({
    notify: false,
    proxy: '127.0.0.1:8001'
  });

  gulp.watch('base/templates/base/*.html').on('change', browserSync.reload);
  gulp.watch('bucketlist/static/bucketlist/css/*.css').on('change', browserSync.reload);
  gulp.watch('bucketlist/templates/bucketlist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['webpack-dev-server', 'django-server', 'browser-sync']);