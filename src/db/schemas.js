const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { snakeCase } = require('lodash');

const timestampColumns = {
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
};

const idColumn = (modelName) => ({
  [`${modelName}_id`]: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
    allowNull: false,
  },
});

const defaultOptions = {
  schema: 'public',
  timestamps: true,
  freezrTableName: true,
  paranoid: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
};

module.exports = {
  // models
  modelWithId(modelName, modelColumns, otherOptions) {
    return (sequelize) =>
      sequelize.define(
        snakeCase(modelName),
        {
          ...idColumn(modelName),
          ...modelColumns,
        },
        {
          ...defaultOptions,
          ...otherOptions,
          tableName: snakeCase(modelName),
        }
      );
  },
  //   Migrations
  migrationCreateTableWithId(modelName, modelColumns) {
    return {
      ...idColumn(modelName),
      ...timestampColumns,
      ...modelColumns,
    };
  },
};
