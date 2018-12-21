'use strict';

const faker = require('faker'); // require the faker module
const paragraphCount = 1; // how many paragraphs we should generate data for
const paragraphData = [];

for (var i = 0; i < paragraphCount; i++) {
  paragraphData.push({
    paragraph: faker.lorem.paragraphs() // generate a random paragraph
  });
}

module.exports = {
  context: {
    paragraphs: paragraphData // use our generated list of members as context data for our template.
  }
};
