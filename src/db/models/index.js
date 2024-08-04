/* eslint-disable no-undef */
/**
 * @file
 *
 * this file creates a database connection
 *
 */
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const envConfig = require('../../config');

const dbConfig = require('../config/config')[envConfig.NODE_ENV || 'dev'];

const basename = path.basename(__filename);

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'postgres',
});
const db = {};

const associations = [];
const hooks = [];

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(`./${file}`);
    const definedModel = model(sequelize);
    db[definedModel.name] = definedModel;
    if (model.associate) {
      associations.push(model.associate);
    }
    if (model.hooks) {
      hooks.push(model.hooks);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

associations.forEach((eachAssociation) => {
  eachAssociation(db);
});

hooks.forEach((eachModelHook) => {
  eachModelHook(db);
});

module.exports = db;
