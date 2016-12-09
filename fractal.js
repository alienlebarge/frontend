'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractal.set('project.title', 'alb frontend');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/src/components');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/docs');

/* Destination for the static export */
fractal.web.set('builder.dest', 'build');

/* Tell Fractal where static assets are */
fractal.web.set('static.path', __dirname + '/tmp');

/* Tell Fractal what is the default preview */
fractal.components.set('default.preview', '@preview');
