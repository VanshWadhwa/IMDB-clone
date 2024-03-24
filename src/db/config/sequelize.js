/**
 * @file
 *
 * this file creates a database connection
 *
 */
const { Sequelize } = require('sequelize');
const envConfig = require('../../config');
const dbConfig = require('../config/config')[envConfig.NODE_ENV || 'dev'];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'postgres',
});

async function checkDbConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

checkDbConnection();

module.exports = sequelize;
