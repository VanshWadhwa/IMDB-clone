/**
 * @file
 *
 * Entry point for the application
 */

const express = require('express');

const app = express();

app.use('/health', (req, res) => {
  res.json({
    status: 'SUCCESS',
  });
});

app.listen(3000, () => console.log('App Listening...'));
