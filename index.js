const express = require('express');
const routes = require('./api/routes')

const app = express();

routes(app);

const port = 3000;

app.listen(port, () =>{
    console.log('The server is running at port', port)
})