export default class Game {
    constructor(movesMade) {
        this.movesMade = '';
        this.possibleMoves = [0,0,0,0,0,0,0];
        this.board = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]; 
        this.fillBoard(movesMade);
        this.winner = this.checkWinner(this.board);
        console.log(`This is the length: ${this.movesMade.length}`);
        console.log(`This is the moves: ${this.movesMade}`);
    }
    
    addToMovesMade(move){
        if (this.winner === 0 && this.possibleMoves[move-1] < 6) {
            this.fillBoard(move);
            this.winner = this.checkWinner(this.board);
        }
    }

    fillBoard(moves){
        var x;
        for(x in moves) {
            this.movesMade = this.movesMade.concat(moves[x]);
            if  (this.movesMade.length % 2 === 1 && moves[x] < 8 && moves[x] > 0 && this.possibleMoves[moves[x]-1] < 6){
                this.board[this.possibleMoves[moves[x]-1]][moves[x]-1] = 1;
                this.possibleMoves[moves[x]-1] ++;
            }
            else if (this.movesMade.length % 2 === 0 && moves[x] < 8 && moves[x] > 0 && this.possibleMoves[moves[x]-1] < 6){
                this.board[this.possibleMoves[moves[x]-1]][moves[x]-1] = 2;
                this.possibleMoves[moves[x]-1] ++;
            }
        }
    }
    
    checkLine(a,b,c,d) {
        // Check first cell non-zero and all cells match
        return ((a !== 0) && (a ===b) && (a === c) && (a === d));
    }

    checkWinner(board) {
        // Check down
        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 7; c++)
                if (this.checkLine(board[r][c], board[r+1][c], board[r+2][c], board[r+3][c]))
                    return board[r][c];
        // Check right
        for (let r = 0; r < 6; r++)
            for (let c = 0; c < 4; c++)
                if (this.checkLine(board[r][c], board[r][c+1], board[r][c+2], board[r][c+3]))
                    return board[r][c];
        // Check down-right
        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 4; c++)
                if (this.checkLine(board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3]))
                    return board[r][c];
        // Check down-left
        for (let r = 3; r < 6; r++) 
            for (let c = 0; c < 4; c++)
                if (this.checkLine(board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3]))
                    return board[r][c];
        return 0;
    }
}