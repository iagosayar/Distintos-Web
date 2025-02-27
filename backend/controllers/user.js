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
    //asi cada usuario loggeado tendra automaticamente el rol de candidato y no de jugador. 
    user.candidate=true;
    user.player=false;
    user.admin=false;
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


/**
 * @function updateUser
 * En el middleware ensureAuth, asignamos el valor del payload (información del usuario) a req.user
 * De esta manera, recibimos dos datos importantes en el controlador:
 * 1. req.params : los parámetros de la URL, que incluyen el ID del usuario que se actualizará.
 * 2. req.user: los parametros del usuario autenticado, que incluyen el ID del usuario que ha iniciado sesión.
 * Ambos datos son necesarios para comparar si el usuario autenticado es el mismo que el usuario que se actualizará.
 * 
 * En el controlador, debemos comprobar que ambos IDs coincidan para asegurarnos de que el usuario autenticado
 * solo pueda actualizar su propia información. Esto ayuda a evitar fraudes y accesos no autorizados.
 */

async function updateUser(req, res) {
var params = req.body;                        //recogemos los parametros que nos llegan por la peticion
var userId = req.params.id;                   //recogemos el id que nos llega por la url


    if (userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permisos para actualizar este usuario'});
    }
// Verificamos que params.candidate y params.player no sean ambos true al mismo tiempo, tambien que params.admin no sea true si es candidato.
    if (params.candidate && params.player) {
        return res.status(400).send({ message: 'No puedes ser pruebas y jugador al mismo tiempo' });
    }

// Si se marca como admin, aseguramos que candidate son false  /solo puedes acceder a ser admin siento jugador
    if (params.admin && params.candidate) {
        return res.status(400).send({ message: 'No puedes ser admin y pruebas al mismo tiempo' });
    }
// Si se marca como candidato, aseguramos que player y admin son false
    if (params.candidate) {
        params.player = false;
        params.admin = false
    }
// Si se marca como player, aseguramos que candidate es false
    if (params.player) {
        params.candidate = false;
    }

   


    try{
    const UpdateUser =  await User.findByIdAndUpdate(userId, params, {new:true})//actualizamos el usuario

    if(!UpdateUser){                                                            //comporbamos si se ha actualizado el usuario
        return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
    }

    return res.status(200).send({user: UpdateUser}); //devolvemos el usuario actualizado
    }catch(err){
        console.log("Error al actualizar el usuario", err);
        return res.status(500).send({message: 'Error al actualizar el usuario'});
    }
}



module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser
}