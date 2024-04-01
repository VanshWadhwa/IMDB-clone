const { DataTypes } = require('sequelize');
const sequelize = require('./../config/sequelize');
const User = require('./user');

const List = sequelize.define('List', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User to list one-to-many relationship
User.hasMany(List);
List.belongsTo(User);

module.exports = List;
