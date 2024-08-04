'use strict';

const { migrationCreateTableWithId } = require('../schemas');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'list',
      migrationCreateTableWithId('list', {
        name: {
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
    await queryInterface.dropTable('list');
  },
};
