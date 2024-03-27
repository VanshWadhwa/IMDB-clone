const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');

const Review = sequelize.define('Review', {
  data: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Many to one relationship one user can have many reviews

User.hasMany(Review);
Review.belongsTo(User);

module.exports = Review;
