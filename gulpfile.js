'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');

const paths = {
  dest: __dirname + '/tmp',
  src: __dirname + '/src',
};

/*
 * Configure a Fractal instance.
 */

const fractal = require('./fractal.js');
const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */
function serve() {
  const server = fractal.web.server({
    sync: true
  });

  server.on('error', err => logger.error(err.message));

  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
};

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */
gulp.task('fractal:build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});

/**
 * Styles
 */
function styles() {
  const processors = [
    require('postcss-custom-properties')
  ];

  return gulp.src(paths.src + '/assets/styles/*.css')
    //.pipe(sourcemaps.init())
    .pipe(postcss(processors))
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest + '/assets/styles'));
}

/**
 * Watch
 */
function watch(done) {
  serve();
  gulp.watch(paths.src + '/**/*.css', styles);
};

/**
 * Task set
 */
const compile = gulp.series(styles);

gulp.task('dev', gulp.series(compile, watch));
