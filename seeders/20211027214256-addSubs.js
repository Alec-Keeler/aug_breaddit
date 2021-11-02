'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Subbreaddits', [
    {
      name: 'Wholesomebread',
      description: 'This is a place for wholesome or whole wheat bread',
      safeForBread: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Breadstapledtotrees',
      description: 'I dunno there is bread and it\'s stapled to a tree',
      safeForBread: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Subbreaddits', null, {});
  }
};
