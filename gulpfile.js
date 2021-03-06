'use strict';

const pkg = require('./package.json');

// Utils
const del = require('del');
const gulp = require('gulp');

// CSS
const postcss = require('gulp-postcss');
const stylelint = require('gulp-stylelint');

// Misc
const ghPages = require('gulp-gh-pages');
const sourcemaps = require('gulp-sourcemaps');
const prettier = require('gulp-plugin-prettier');

/**
 * Configuration
 */

// Paths
const paths = {
  build: __dirname + '/www',
  dest: __dirname + '/tmp',
  src: __dirname + '/src'
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
}

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */
function build() {
  const builder = fractal.web.builder();

  builder.on('progress', (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, 'info')
  );
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
}

/**
 * Clean
 */
function clean() {
  return del(paths.dest + '/assets/');
}

/**
 * Deploy
 */
function deploy() {
  // Push contents of build folder to `gh-pages` branch
  return gulp.src(paths.build + '/**/*').pipe(
    ghPages({
      force: true
    })
  );
  done();
}

/**
 * Fonts
 */
function fonts() {
  return gulp
    .src(paths.src + '/assets/fonts/**/*.{woff,woff2}')
    .pipe(gulp.dest(paths.dest + '/assets/fonts'));
}

/**
 * Scripts
 */
function scripts() {
  return gulp
    .src('node_modules/fontfaceobserver/fontfaceobserver.js')
    .pipe(gulp.dest(paths.dest + '/assets/scripts'));
}

/**
 * Styles
 */
function styles() {
  const processors = [
    require('postcss-easy-import'),
    require('postcss-map')({
      maps: [
        paths.src + '/tokens/borders.json',
        paths.src + '/tokens/breakpoints.json',
        paths.src + '/tokens/colors.json',
        paths.src + '/tokens/fonts.json',
        paths.src + '/tokens/spaces.json',
        paths.src + '/tokens/animations.json'
      ]
    }),
    require('postcss-color-mod-function'),
    require('postcss-media-minmax'),
    require('postcss-custom-media'),
    require('postcss-nested'),
    require('postcss-extend-rule'),
    require('autoprefixer'),
    require('cssnano')
  ];

  return gulp
    .src(paths.src + '/assets/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest + '/assets/styles'));
}

/**
 * Style linting
 */
function lintstyles() {
  return gulp.src(paths.src + '/**/*.css').pipe(
    stylelint({
      failAfterError: false,
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ]
    })
  );
}

// replace unformatted with formatted
function format() {
  return gulp
    .src(['./src/**/*.{js,json,md}', '*.{js,json,md}'])
    .pipe(prettier.format({ singleQuote: true }))
    .pipe(gulp.dest(file => file.base));
}

/**
 * Watch
 */
function watch(done) {
  serve();
  gulp.watch(paths.src + '/**/*.css', gulp.parallel(lintstyles, styles));
}

/**
 * Task set
 */
const compile = gulp.series(
  clean,
  gulp.parallel(fonts, scripts, lintstyles, styles, format)
);

gulp.task('build', gulp.series(compile, build));
gulp.task('dev', gulp.series(compile, watch));
gulp.task('deploy', gulp.series(build, deploy));
