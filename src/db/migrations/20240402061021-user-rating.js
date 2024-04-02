'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRatings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contentId: {
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
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('UserRatings');
  },
};
