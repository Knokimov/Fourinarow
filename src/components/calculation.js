// const movesmade = "12141377";

// function calc(moves) {
//     const player1moves = moves.match(new RegExp('.{1,' + 1 + '}', 'g'));
//     console.log(player1moves);
// }

// calc(movesmade);


// import React, { Component } from 'react';

class Board {
    constructor(props) {
        this.state = 
        {movesmade: "1234567",
        refutation: '',
        whatever: 'Not it mane',
        column: [0,0,0,0,0,0,0]}
    }


colorboard() {
    const playermoves = this.state.movesmade.match(new RegExp('.{1,' + 1 + '}', 'g'));
    for (let i = 0; i < playermoves.length; i++) {
        if (i % 2 == 0) {

        // console.log(this.state.movesmade[i])

        const columnSpace = this.state.column;
        const squarenumber = 35 + 1 * playermoves[i];
        this.state.column[playermoves[i]] =+ 1;
        // document.getElementById(`square${squarenumber}`).src = BlackC;
        // console.log(this.state.movesmade[i]*1+4);
        
    } else {
        const squarenumber = 35 + 1 * playermoves[i];
        // document.getElementById(`square${squarenumber}`).src = RedC;
        const columnSpace = this.state.column[playermoves[i]];

        // console.log(this.state.movesmade[i])

        // console.log(this.state.column[0]);
        }
        // document.getElementById
    }
    this.state.column[0] = 2;
    console.log(this.state.column[0]);}

}


x = new Board()
x.colorboard();

// console.log(x.whatever);

// const board = [0,0,0,0,0,0,0]

// board[3] +=1;
// board[3] +=1;

// console.log(board);