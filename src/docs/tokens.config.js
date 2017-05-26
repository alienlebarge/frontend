'use strict';

const path = require('path');

module.exports = {
    context: {
        borders: require(path.join(process.cwd(), 'src/tokens/borders.json')),
        breakpoints: require(path.join(process.cwd(), 'src/tokens/breakpoints.json')),
        colors: require(path.join(process.cwd(), 'src/tokens/colors.json')),
        fonts: require(path.join(process.cwd(), 'src/tokens/fonts.json')),
        spaces: require(path.join(process.cwd(), 'src/tokens/spaces.json'))
    }
};
