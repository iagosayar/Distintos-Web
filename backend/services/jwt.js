'use strict';
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '95675'; //clave secreta para el token

exports.createToken = function(user) {
var payload = {
    sub: user._id,
    name: user.name,
    email: user.email,
    admin: user.admin,
    player: user.player,
    candidate: user.candidate,
    image: user.Image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
};
return jwt.encode(payload, secret);

};