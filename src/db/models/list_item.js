const { DataTypes } = require('sequelize');
const sequelize = require('./../config/sequelize');
const List = require('./list');

const ListItem = sequelize.define('ListItem', {
  item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// ListItem to list many-to-one relationship
List.hasMany(ListItem);
ListItem.belongsTo(List);

module.exports = ListItem;
