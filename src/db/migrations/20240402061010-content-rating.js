'use strict';

const { migrationCreateTableWithId } = require('../schemas');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'content_rating',
      migrationCreateTableWithId('content_rating', {
        content_id: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
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
        no_of_rating: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        total_rating: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      })
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('content_rating');
  },
};
