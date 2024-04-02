/**
 * @file
 *
 * Entry point for the application
 */

const express = require('express');
const routes = require('./src/routes');

const envConfig = require('./src/config');

// Declarations
const PORT = envConfig.PORT || 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use('/health', (req, res) => {
  res.json({
    status: 'SUCCESS',
  });
});
app.use('/', routes);

// Listening to app
if (envConfig.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
}

module.exports = app;
