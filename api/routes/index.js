const express = require('express');
const testeRoute = require('./testeRoute')

module.exports = app =>{
    app.use(express.json(), testeRoute)
}