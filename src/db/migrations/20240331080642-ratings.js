'use strict';

/** @type {import('sequelize-cli').Migration} */
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
        unique: true,
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

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserRatings');
    await queryInterface.dropTable('ContentRatings');
  },
};
