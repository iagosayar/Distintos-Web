var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const matchEventSchema = new Schema({
    eventType: {
        type: String, 
        enum:["goal","assist","yellowCard","redCard","mvp"], // Tipo de evento: "goal", "assist", "yellowCard", "redCard", "tackle"
        required: true,
    },
    playerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player', // Referencia al modelo Player
        required: true,
    },
    team: {
        type: String, // Puede ser "team1" 
        default: 'team1',
        required: false,
    },

});  // Agregar marcas de tiempo de creación y actualización

// Crear y exportar el modelo
module.exports = mongoose.model('MatchEvent', matchEventSchema);