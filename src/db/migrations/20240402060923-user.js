'use strict';

const { migrationCreateTableWithId } = require('../schemas');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'user',
      migrationCreateTableWithId('user', {
        username: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      })
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user');
  },
};
