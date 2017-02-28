'use strict';

const paths = {
  build: __dirname + '/www',
  src: __dirname + '/src',
  static: __dirname + '/tmp'
};

const mandelbrot = require('@frctl/mandelbrot')({
  lang: 'en-gb',
  static: {
    mount: 'fractal'
  },
  skin: 'grey'
});

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractal.set('project.title', 'alb frontend');

// Components settings
fractal.components.set('path', paths.src + '/components'); // tell Fractal where the components will live
fractal.components.engine('@frctl/nunjucks'); // register the Nunjucks adapter for your components
fractal.components.set('ext', '.html'); // look for files with a .nunj file extension
fractal.components.set('default.preview', '@preview'); // Tell Fractal what is the default preview

// Documentation settings
fractal.docs.set('path', __dirname + '/src/docs'); // tell Fractal where the documentation pages will live

// Web settings
fractal.web.set('builder.dest', paths.build); // Destination for the static export
fractal.web.set('static.path', paths.static); // Tell Fractal where static assets are
fractal.web.set('builder.urls.ext', null); // Tell fractal to not use file extension when rewriting URLs
fractal.web.theme(mandelbrot); // Tell fractal wich theme to use
