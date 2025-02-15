'use strict'
var mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        number: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        gamertag: {
            type: String,
            required: true
        },
        platform: {
            type: String,
            required: true
        },
        position: {
            type: String
        },
        stats: {
            goals: {
                type: Number,
                default: 0
            },
            assists: {
                type: Number,
                default: 0
            },
            cards: {
                yellow: {
                    type: Number,
                    default: 0
                },
                red: {
                    type: Number,
                    default: 0
                }
            }
        // Otros campos relacionados con el jugador...
    }
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;