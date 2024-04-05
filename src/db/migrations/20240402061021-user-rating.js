'use strict';

const { migrationCreateTableWithId } = require('../schemas');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'user_rating',
      migrationCreateTableWithId('user_rating', {
        content_id: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        rating: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            max: {
              args: [10.0],
              msg: 'Your rating should be less than or equal to 10',
            },
            min: {
              args: [0.0],
              msg: 'Your rating should be greater than or equal to 0',
            },
          },
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'user',
            key: 'user_id',
          },
        },
      })
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_rating');
  },
};
