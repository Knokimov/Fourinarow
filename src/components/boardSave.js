import React, { Component } from 'react';
import "./board.css";
import axios from 'axios';
import BlackCircleGrayBack from "../BlackCircleGrayBack.jpg";
import WhiteC from "../WhiteCircleGreyBack.jpg";
import BlueCircleGrayBack from "../BlueCircleGrayBack.jpg"; 
import WhiteBack from "../WhiteBack.jpg";
import Blue from "../BlueCircleWhiteBack.jpg"; 
import Black from "../BlackCircleWhiteBack.jpg"; 
import Game from "./game";

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.showCircle = this.showCircle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            movesmade: '',
            refutation: '',
            ongoing: '',
            ai: '',
            player: '',
            buttonsEnabled: true,
            board: [],
            game: new Game,
            positionScore: []
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:5000/games/' + this.props.match.params.id;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            movesmade: data.movesmade,
            ai: data.ai,
            player: data.player});
        this.colorboard();
    }

    addMovetoMovesmade(x) {
        this.setState({
        movesmade: this.state.movesmade + x
        })
    }

    showCircle(e) {
        const column = e.target.className
        const image = document.getElementById(column);
        if(this.state.player === "Blue") {
            image.src = Blue;
        } else if (this.state.player === "Black"){
            image.src = Black;
        }
    }

    hideCircle(e) {
        const column = e.target.className
        const image = document.getElementById(column);
        image.src = WhiteBack;
    }

    chkLine(a,b,c,d) {
        // Check first cell non-zero and all cells match
        return ((a != 0) && (a ==b) && (a == c) && (a == d));
    }

    chkWinner(bd) {
        // Check down
        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 7; c++)
                if (this.chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c]))
                    return bd[r][c];
        // Check right
        for (let r = 0; r < 6; r++)
            for (let c = 0; c < 4; c++)
                if (this.chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3]))
                    return bd[r][c];
        // Check down-right
        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 4; c++)
                if (this.chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3]))
                    return bd[r][c];
        // Check down-left
        for (let r = 3; r < 6; r++) 
            for (let c = 0; c < 4; c++)
                if (this.chkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3]))
                    return bd[r][c];
        return 0;
    }

    colorboard() {
        const columnF = [0,0,0,0,0,0,0];
        const board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for (let i = 0; i < this.state.movesmade.length; i++) {
            if (i % 2 === 0) {
                if (this.state.movesmade[i] == 0) {
                    document.getElementById('gameinfo').innerHTML = "Black wins";
            break;
        }

        const columnSpace = columnF[this.state.movesmade[i]*1-1];
        const squarenumber = 34 + 1 * this.state.movesmade[i] - columnSpace * 7;
        if (columnF[this.state.movesmade[i]*1-1] +1 > 6 ) {
          document.getElementById('gameinfo').innerHTML = "Invalid Move!";
          } else {
        columnF[this.state.movesmade[i]*1-1] +=1;
        if (squarenumber >= 0 && squarenumber < 42){
        
          //CODE FOR CHECKING WINS
        board[squarenumber] = 1;
        document.getElementById(`square${squarenumber}`).src = BlackCircleGrayBack;
        // document.getElementById('gameinfo').innerHTML = this.state.movesmade;
      }
    }
        
    } else {
      if (this.state.movesmade[i] == 0) {
        document.getElementById('gameinfo').innerHTML = "Blue Wins";
        break;
      }  
      
      const columnSpace = columnF[this.state.movesmade[i]*1-1];
        const squarenumber = 34 + 1 * this.state.movesmade[i] - columnSpace * 7;
        
        if (columnF[this.state.movesmade[i]*1-1]+ 1> 6 ) {
          document.getElementById('gameinfo').innerHTML = "Invalid Move!";
          } else {
        columnF[this.state.movesmade[i]*1-1] +=1;
      
        if (squarenumber >= 0 && squarenumber < 42){

          board[squarenumber] = 2;
        document.getElementById(`square${squarenumber}`).src = BlueCircleGrayBack;}
        // document.getElementById('gameinfo').innerHTML = this.state.movesmade;

                }
            }
        }
        this.setState({board: board})    
    }

    anounceWinner() {
        const realboard = [this.state.board.splice(0,7), this.state.board.splice(0,7), this.state.board.splice(0,7),this.state.board.splice(0,7),this.state.board.splice(0,7),this.state.board.splice(0,7)]
        if(this.chkWinner(realboard) === 1) {
            document.getElementById('gameinfo').innerHTML = "Black Wins";
        } else if (this.chkWinner(realboard) === 2) {
            document.getElementById('gameinfo').innerHTML = "Blue Wins";
        }
    }
  
    async onSubmit(e) {
        if (this.state.buttonsEnabled) {
            e.preventDefault();
            this.setState({buttonsEnabled: false});
            const event = e.target.className;

            const game = {
                movesmade: this.state.movesmade + event,
                refutation: this.state.refutation,
                ongoing: "YES",
                positionScore: this.state.positionScore
            }

            this.setState({movesmade: this.state.movesmade + event});

            await axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
                .then(res => console.log(res.data))    
            await axios.get('http://localhost:5000/games/' + this.props.match.params.id)
                .then(res => this.setState({
                    movesmade: res.data.movesmade,
                    buttonsEnabled: true,
                    positionScore: res.data.positionScore}))
                .catch((error) => {
                    console.log(error);
                })
                .then(setTimeout(() => {
                    this.colorboard();
                }, 500));
                this.colorboard();
                this.anounceWinner();
                console.log(this.state.positionScore)
        }
    }


    render() {
        return (
                <div>
        <h3 id = "gameinfo"> </h3>
        <table classname = "table"> 
        <thead className ="circle_placement"> 
        <div class = "circle_placement">

        <img src = {WhiteBack} className = "column1" id="1" />
        <img src = {WhiteBack} className = "column2" id="2" />
        <img src = {WhiteBack} className = "column3" id="3" />
        <img src = {WhiteBack} className = "column4" id="4" />
        <img src = {WhiteBack} className = "column5" id="5" />
        <img src = {WhiteBack} className = "column6" id="6" />
        <img src = {WhiteBack} className = "column7" id="7" />

        </div>
        </thead>
        <tbody>
        <div class = "row1">
        <img src = {WhiteC} className = "1" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square0"/>
        <img src = {WhiteC} className = "2" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square1"/>
        <img src = {WhiteC} className = "3" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square2"/>
        <img src = {WhiteC} className = "4" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square3"/>
        <img src = {WhiteC} className = "5" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square4"/>
        <img src = {WhiteC} className = "6" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square5"/>
        <img src = {WhiteC} className = "7" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square6"/>
        </div>

        <div class = "row2">
        <img src = {WhiteC} className = "1" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square7"/>
        <img src = {WhiteC} className = "2" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square8"/>
        <img src = {WhiteC} className = "3" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square9"/>
        <img src = {WhiteC} className = "4" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square10"/>
        <img src = {WhiteC} className = "5" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square11"/>
        <img src = {WhiteC} className = "6" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square12"/>
        <img src = {WhiteC} className = "7" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square13"/>
        </div>

        <div class = "row3">
        <img src = {WhiteC} className = "1" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square14"/>
        <img src = {WhiteC} className = "2" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square15"/>
        <img src = {WhiteC} className = "3" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square16"/>
        <img src = {WhiteC} className = "4" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square17"/>
        <img src = {WhiteC} className = "5" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square18"/>
        <img src = {WhiteC} className = "6" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square19"/>
        <img src = {WhiteC} className = "7" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square20"/>
        </div>

        <div class = "row4">
        <img src = {WhiteC} className = "1" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square21"/>
        <img src = {WhiteC} className = "2" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square22"/>
        <img src = {WhiteC} className = "3" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square23"/>
        <img src = {WhiteC} className = "4" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square24"/>
        <img src = {WhiteC} className = "5" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square25"/>
        <img src = {WhiteC} className = "6" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square26"/>
        <img src = {WhiteC} className = "7" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square27"/>
        </div>

        <div class = "row5">
        <img src = {WhiteC} className = "1" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square28"/>
        <img src = {WhiteC} className = "2" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square29"/>
        <img src = {WhiteC} className = "3" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square30"/>
        <img src = {WhiteC} className = "4" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square31"/>
        <img src = {WhiteC} className = "5" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square32"/>
        <img src = {WhiteC} className = "6" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square33"/>
        <img src = {WhiteC} className = "7" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square34"/>
        </div>

        <div class = "row6">
        <img src = {WhiteC} className = "1" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square35"/>
        <img src = {WhiteC} className = "2" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square36"/>
        <img src = {WhiteC} className = "3" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square37"/>
        <img src = {WhiteC} className = "4" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square38"/>
        <img src = {WhiteC} className = "5" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square39"/>
        <img src = {WhiteC} className = "6" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square40"/>
        <img src = {WhiteC} className = "7" onClick={this.onSubmit} onMouseOver = {this.showCircle} onMouseLeave={this.hideCircle} alt= "circle" id= "square41"/>
        </div>
        </tbody>
        </table>
        </div>
        )
    }
}