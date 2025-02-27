'use strict'

var express = require('express');
var userController = require('../controllers/user');
var api = express.Router();
//para poder realizar la autenticacion de usuario, necesitamos importar el middleware ensureAuth
var md_auth = require('../middlewares/authenticated');  

api.get('/pruebas', userController.pruebas);
api.post('/register', userController.saveUser); 
api.post('/login', userController.loginUser);  


//aqui creamos una url para probar el middleware el cual se encarga de comprobar si el usuario esta autenticado para ello le pasamos como segundo parametro el middleware ensureAuth
api.post('/prueba_controlador', md_auth.ensureAuth, userController.pruebas);

/*Creamos una ruta para actualizar los datos de un usuario. Para ello, necesitamos pasar el ID del usuario a actualizar en la URL.
Además, necesitamos enviar los datos del usuario a actualizar en el cuerpo de la petición. */
api.put('/update-user/:id', md_auth.ensureAuth, userController.updateUser);




module.exports = api;