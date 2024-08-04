'use strict';
const { migrationCreateTableWithId } = require('../schemas');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'list_item',
      migrationCreateTableWithId('list_item', {
        item: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        list_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'list',
            key: 'list_id',
          },
        },
      })
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('list_item');
  },
};
