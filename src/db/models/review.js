const { DataTypes } = require('sequelize');

const { modelWithId } = require('../schemas');

module.exports = modelWithId('review', {
  data: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Many to one relationship one user can have many reviews

module.exports.associate = function associations(models) {
  const { user, review } = models;
  user.hasMany(review, {
    foreignKey: 'user_id',
    as: 'user',
  });
  review.belongsTo(user, {
    foreignKey: 'user_id',
    as: 'user',
  });
};
