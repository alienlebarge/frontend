'use strict';

const faker = require('faker'); // require the faker module
const listItemCount = 5; // how many itmes we should generate data for
const listItemData = [];

for (var i = 0; i < listItemCount; i++) {
  listItemData.push({
    item: faker.lorem.sentence() // generate a random data
  });
}

module.exports = {
  context: {
    list: listItemData // use our generated list of members as context data for our template.
  },
  variants: [
    {
      name: 'ordered'
    },
    {
      name: 'inline',
      context: {
        styleModifier: 'o-list-inline',
        styleModifierChild: 'o-list-inline__item'
      }
    },
    {
      name: 'bare',
      context: {
        styleModifier: 'o-list-bare',
        styleModifierChild: 'o-list-bare__item'
      }
    }
  ]
};
