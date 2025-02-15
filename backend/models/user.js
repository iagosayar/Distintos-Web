'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    number: {
        type: String,
        default: 0
    },
    admin: {
        type: Boolean,
        default: false,
        required: true
    }, 
    player: {
        type: Boolean,
        default: false,
        required: true
    },
    candidate: {
        type: Boolean,
        default: true,
        required: true
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

const User = mongoose.model('User', UserSchema);
module.exports = User;