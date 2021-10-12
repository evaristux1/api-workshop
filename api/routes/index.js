const usersRoute = require('./usersRoute');
const themesRoute = require('./themesRoute');
const interestsRoute = require('./interestsRoute')
const express = require('express');
const morgan = require('morgan');

module.exports = (app) => {
  app.use(
    '/api/workshop',
    express.json(),
    morgan('dev'),
    express.urlencoded({ extended: true }),
    usersRoute,
    themesRoute,
    interestsRoute
  );
};
