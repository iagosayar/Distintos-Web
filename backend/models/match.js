var mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    myteam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MyTeam",
        required: true
    },
    team2: {
        type: teamSchema,
        required: true
    },
    score_team1: {
        type: Number,
        required: true
    },
    score_team2: {
        type: Number,
        required: true
    },
    shoot_on_target_myTeam: {
        type:Number,
        required: false 
    },
    shoot_on_target_team2: {
        type:Number,
        required: false 
    },
    date: {
        type: String,
        required: true
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    mvp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    }

});

module.exports =  mongoose.model('Match', matchSchema);
