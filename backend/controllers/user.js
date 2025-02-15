'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt'); // Asegúrate de que este archivo exista y la ruta sea correcta

function pruebas(req, res) {   
    res.status(200).send({ message: 'Bienvenido al curso de AngularJS y NodeJS' });
}

async function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    console.log('Parámetros recibidos:', params); 

    user.name = params.name;
    user.email = params.email;
    user.phone = params.phone;
    user.gamertag = params.gamertag;
    user.platform = params.platform;
    user.position = params.position;

    if (params.password) {
        params.password = params.password.trim(); // Eliminar espacios en blanco
        console.log('Contraseña recibida:', params.password);
        // encriptar contraseña 
        bcrypt.hash(params.password, null, null, async function(err, hash) {
            if (err) {
                console.log('Error al encriptar la contraseña:', err);
                return res.status(500).send({ message: 'Error al encriptar la contraseña' });
            }
            user.password = hash;
            console.log('Contraseña encriptada con éxito:', hash);

            if (user.name && user.email && user.gamertag && user.platform && user.position && user.phone) {
                console.log('Todos los campos requeridos están presentes, guardando tester.');
                try {
                    // guardar usuario
                    const userStored = await user.save();
                    console.log('Tester registrado con éxito:', userStored);
                    return res.status(200).send({ user: userStored });
                } catch (err) {
                    console.log('Error al guardar el tester:', err);
                    return res.status(500).send({ message: 'Error al guardar el usuario' });
                }
            } else {
                console.log('Faltan campos requeridos.');
                return res.status(400).send({ message: 'Faltan campos requeridos' });
            }
        });
    } else {
        console.log('Contraseña no recibida.');
        return res.status(400).send({ message: 'Introduce la contraseña' });
    }
}

async function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).send({ message: 'El usuario no se ha podido identificar!!' });
        }

        bcrypt.compare(password, user.password, (err, check) => {
            if (check) {
                if (params.gethash) {
                    // devolver un token de jwt
                    res.status(200).send({
                        token: jwt.createToken(user)
                    });
                } else {
                    // devolver datos de usuario
                    return res.status(200).send({ user });
                }
            } else {
                return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
            }
        });
    } catch (err) {
        console.log('Error al buscar el usuario:', err);
        return res.status(500).send({ message: 'Error al buscar el usuario' });
    }
}

module.exports = {
    pruebas,
    saveUser,
    loginUser
};