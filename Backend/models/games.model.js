const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GamesSchema = new Schema({
    movesmade: {
        type:String
    },
    refutation: {
        type:String
    },
    ongoing: {
        type:String
    },
    ai: {
        type:String
    },
    player: {
        type:String
    },
    gameStarted: {
        type:Date   
    },
    gameFinished: {
        type:Date
    },
    whoWon: {
        type:String
    },
    positionScore: {
        type:Array
    },
    timestampsPerMove:
    {
        type:Array
    },
    currentPos: {
        type:Array
    }
}, {
    timestamps: true
});

const Games = mongoose.model('Games', GamesSchema);
module.exports = Games;