var jwt = require("jwt-simple");
var moment = require("moment");
//Aqui cargamos la variable de entorno JWT_SECRET_KEY o en caso de no existir usamos el valor '95675'
const secret = process.env.JWT_SECRET_KEY || '95675'; 



/**
 * Creamos una var con una funcion que se llama ensureAuth , esta comprobara si tenemos authorizacion en la cabecera de la peticion. la cual tiene una serie de parametros
 * que podemos recoger como hacemos ahi. 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.ensureAuth = function(req, res, next) { 
    if(!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no tiene la cabecera de autenticación' });
    }
    //Aqui eliminamos las comillas simples y dobles de la cabecera de autenticacion
    var token = req.headers.authorization.replace(/[" "]*/g,"");

    try{
        //Aqui decodificamos el token y lo guardamos en una variable payload
        var payload = jwt.decode(token, secret);

        //Aqui comprobamos si el token ha expirado. Si la fecha de expiracion del token es menor o igual a la fecha actual, devolvemos un mensaje de error
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
    }catch(ex){
        console.log(ex);    
        return res.status(404).send({message: 'Token no valido'});
    }

    //Aqui añadimos una propiedad user al objeto request que contendra el payload del token. de esta manera tenemos acceso 
    // a los datos del usuario en cualquier controlador
    req.user = payload;

    //Aqui llamamos a la funcion next() para que el controlador que llama a esta funcion continue con su ejecucion
    next(); 
}

