
'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');

//Aqui cargamos la variable de entorno JWT_SECRET_KEY o en caso de no existir usamos el valor '95675'
const secret = process.env.JWT_SECRET_KEY || '95675'; 


exports.createToken = function(user) {
var payload = {
    sub: user._id,
    name: user.name,
    email: user.email,
    admin: user.admin,
    player: user.player,
    candidate: user.candidate,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
};
return jwt.encode(payload, secret);

};