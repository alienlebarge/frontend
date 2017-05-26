'use strict';

const path = require('path');

module.exports = {
  context: {
    colors: require(path.join(process.cwd(), 'src/tokens/colors.json'))
  }
};
