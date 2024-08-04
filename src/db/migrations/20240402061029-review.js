'use strict';

const { migrationCreateTableWithId } = require('../schemas');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'review',
      migrationCreateTableWithId('review', {
        data: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        content_id: {
          allowNull: false,
          type: Sequelize.STRING,
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
    await queryInterface.dropTable('review');
  },
};
