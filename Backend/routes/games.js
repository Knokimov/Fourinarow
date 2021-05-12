const TheGame = require('./game');
const router = require('express').Router();
let Game = require('../models/games.model');
const c4solver = require("c4solver");
c4solver.deload("");

function gameStatus(object) {
    if (object.winner != 0) {
        return "Finished";
    } 
    else if (object.movesMade.length = 42){
        return "Finished";
    }
    else {
        return "Not finished";
    }
}

function minValueColumn(array) {
    let scoreArray = array.split(" ")
    let col = 0;
    let max = scoreArray[0] * 1;
    for (i = 0; i < scoreArray.length; i++){
        if (scoreArray[i] == "100") {
        }   else if (scoreArray[i] * 1  <= max) {
            max = scoreArray[i] * 1;
            col = i+1;
        }
    }
    return col;
}

function calculation(value) {
    if (value.length % 2 == 0) {
        return minValueColumn(c4solver.refute(value));
    } else {
        return minValueColumn(c4solver.refute(value));
    }
}

// GET REQUEST
router.route('/:id').get((req,res) => {
  Game.findById(req.params.id)
    .then(game => res.json(game))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/").get((req,res) => {
    Game.find()
    .then(moves => res.json(moves))
    .catch(err => res.status(400).json('Error: ' + err));
    });

// POST REQUEST
router.route('/addBlack').post((req,res) => {
    const movesmade = req.body.movesmade;
    const refutation = calculation(req.body.movesmade);
    const ongoing = req.body.ongoing;
    const player = "Black";
    const ai = "Blue";

    const newGame = new Game({
        movesmade,
        refutation,
        ongoing,
        player,
        ai
    });

    newGame.save()
    .then(() => res.json('Game added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addBlue').post((req,res) => {
    const movesmade = req.body.movesmade + calculation(req.body.movesmade);
    const refutation = calculation(req.body.movesmade);
    const ongoing = req.body.ongoing;
    const player = "Blue";
    const ai = "Black";
    const positionScore = [];
    const timestampsPerMove= [];

    const newGame = new Game({
        movesmade,
        refutation,
        ongoing,
        player,
        ai,
        positionScore,
        timestampsPerMove
    });

    newGame.save()
    .then(() => res.json('Game added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});



// UPDATE REQUEST
router.route('/update/:id').post((req, res) => {
    Game.findById(req.params.id)
        .then(game => {
        game.movesmade = req.body.movesmade + calculation(req.body.movesmade);
        game.refutation = calculation(req.body.movesmade);
        game.ongoing = gameStatus(new TheGame(req.body.movesmade + calculation(req.body.movesmade)));
        game.currentPos = c4solver.refute(req.body.movesmade);
        game.positionScore.push(game.currentPos[0].split(" ").reduce(function(a,b) {return Math.min(a,b)}));
        game.timestampsPerMove.push(req.body.movesmade);
        game.whoWon = new TheGame(req.body.movesmade + calculation(req.body.movesmade)).winner;

        game.save()
            .then(() => res.json('Game updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });

module.exports = router;