'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContentRatings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contentId: {
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
      noOfRating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalRating: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    await queryInterface.dropTable('ContentRatings');
  },
};
