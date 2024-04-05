const { DataTypes } = require('sequelize');

// const List = require('./list');
const { modelWithId } = require('../schemas');

module.exports = modelWithId('list_item', {
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
// List.hasMany(ListItem);
// ListItem.belongsTo(List);

module.exports.associate = function associations(models) {
  const { list_item, list } = models;
  list.hasMany(list_item, {
    foreignKey: 'list_id',
    as: 'list',
  });
  list_item.belongsTo(list, {
    foreignKey: 'list_id',
    as: 'list',
  });
};
