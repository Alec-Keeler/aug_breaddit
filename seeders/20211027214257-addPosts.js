'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Posts', [
      {
        title: 'Rise Up',
        content: 'Not even keto can stop us',
        userId: 1,
        subId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Reddit\'s still getting more traffic',
        content: 'Don\'t be sourdough',
        userId: 2,
        subId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bread on tree',
        content: 'picture here',
        userId: 1,
        subId: 2,
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
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
