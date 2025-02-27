'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configurar cabeceras http

//rutas base

app.use('/api', user_routes);


app.get('/pruebas', function(req, res) { // Fixed: added 'req' parameter
    res.status(200).send({ message: 'Bienvenido al curso de AngularJS y NodeJS' });
});

module.exports = app;