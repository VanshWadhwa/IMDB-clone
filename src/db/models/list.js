const { DataTypes } = require('sequelize');

const { modelWithId } = require('../schemas');

module.exports = modelWithId('list', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User to list one-to-many relationship

module.exports.associate = function associations(models) {
  const { user, list } = models;
  user.hasMany(list, {
    foreignKey: 'user_id',
    as: 'list',
  });
  list.belongsTo(user, {
    foreignKey: 'user_id',
    as: 'user',
  });
};
