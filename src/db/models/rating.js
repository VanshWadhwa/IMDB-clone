const { DataTypes } = require('sequelize');
const sequelize = require('./../config/sequelize');
const User = require('./user');

// done by the user
const UserRating = sequelize.define('UserRating', {
  contentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
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
});

// content rating, for the content
const ContentRating = sequelize.define('ContentRating', {
  contentId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rating: {
    type: DataTypes.FLOAT,
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalRating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// User Rating belongs to user
User.hasMany(UserRating);
UserRating.belongsTo(User);

module.exports = { UserRating, ContentRating };
