var mongoose = require('mongoose');
var Player = require('./player');
var { type } = require('os');

const Schema = mongoose.Schema;

// Team schema
const teamSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],
    rivals: [{  
        type: Schema.Types.ObjectId,
        ref: `Rival`
    }],
    matchs: [{  
        type: Schema.Types.ObjectId,
        ref: `Match`
    }]
});

module.exports = mongoose.model('Team', teamSchema);