const { DataTypes } = require('sequelize');

const { modelWithId } = require('../schemas');

// content rating, for the content
module.exports = modelWithId('content_rating', {
  content_id: {
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
  no_of_rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
