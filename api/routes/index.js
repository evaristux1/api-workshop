const express = require('express');
const usersRoute = require('./usersRoute')
const themesRoute = require('./themesRoute')

module.exports = app =>{
    app.use(express.json(), usersRoute, themesRoute)
} 