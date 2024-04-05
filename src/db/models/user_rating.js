const { DataTypes } = require('sequelize');

// const User = require('./user');
const { modelWithId } = require('../schemas');

// done by the user
module.exports = modelWithId('user_rating', {
  content_id: {
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

// // User Rating belongs to user
// User.hasMany(UserRating);
// UserRating.belongsTo(User);

module.exports.associate = function associations(models) {
  const { user, user_rating } = models;
  user.hasMany(user_rating, {
    foreignKey: 'user_id',
    as: 'user_rating',
  });
  user_rating.belongsTo(user, {
    foreignKey: 'user_id',
    as: 'user',
  });
};
