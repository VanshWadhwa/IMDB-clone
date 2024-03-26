const { DataTypes } = require('sequelize');
const sequelize = require('./../config/sequelize');
const User = require('./user');

const List = sequelize.define('List', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const ListItem = sequelize.define('ListItem', {
  item: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// User to list one-to-many relationship
User.hasMany(List);
List.belongsTo(User);

// ListItem to list many-to-one relationship
List.hasMany(ListItem);
ListItem.belongsTo(List);

module.exports = { List, ListItem };
