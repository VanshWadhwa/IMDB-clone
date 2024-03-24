/**
 * @file
 *
 * Entry point for the application
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const envConfig = require('./src/config');
require('./src/db/config/sequelize');

// Declarations
const PORT = envConfig.PORT || 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/health', (req, res) => {
  res.json({
    status: 'SUCCESS',
  });
});

// Listening to app
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
