const express = require('express');
const usersRoute = require('./usersRoute')

module.exports = app =>{
    app.use(express.json(), usersRoute)
}