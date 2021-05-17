'use strict';

const express = require('express');
const app = express();
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const validator= require('./middleware/validator');
app.use(express.json());
app.use(logger);

app.get('/', homeHandler);
app.get('/bad', badHandler);

//functions

function homeHandler(req, res) {
  res.send('welcome in server.js :)');
}

function badHandler(req, res) {
  throw new Error('something went wrong!');
}

//localhost:5000/person?name=ashar
// app.get('/person', (req, res) => {
//     const output = {
//         name: req.query.name,
//     }
//     res.json(output);
// });
app.get('/person', validator, (req, res) => {
  res.status(200).json({
    name: req.query.name,
  });
});

app.use('*', notFoundHandler);
app.use(errorHandler);


function start(port) {
    app.listen(port, () => {
        console.log(`The server is listening on ${port}`);
    });
}

module.exports = {
    app: app,
    start: start
}