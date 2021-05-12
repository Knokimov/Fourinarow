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
        this.onSubmit = this.onSubmit.bind(this);
        this.displayColumnHeader = this.displayColumnHeader.bind(this);
        this.hideHeader = this.hideHeader.bind(this);
        this.state = {
            movesmade: '',
            refutation: '',
            whoWon: 0,
            player: '',
            buttonsEnabled: true,
            game: new Game(''),
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:5000/games/' + this.props.match.params.id;
        const response = await fetch(url);
        const data = await response.json();
        const gameObject = new Game(data.movesmade);
        this.setState({
            movesmade: data.movesmade,
            ai: data.ai,
            player: data.player,
            game: gameObject,
            whoWon: gameObject.winner
        });
    }
    
    async onSubmit(img) {
        if (this.state.buttonsEnabled && this.state.whoWon === 0) {
            this.setState({buttonsEnabled: false,
                movesmade: this.state.movesmade + img.target.className
            });
            
            const game = {
                movesmade: this.state.movesmade + img.target.className,
                refutation: this.state.refutation,
                ongoing: "YES",
                positionScore: this.state.positionScore,
                whoWon: this.state.whoWon,
                test: this.state.game
            }
            console.log(game);
                        
            await axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
            .then(res => console.log(res.data))    
            await axios.get('http://localhost:5000/games/' + this.props.match.params.id)
            .then(res =>  this.setState({
                movesmade: res.data.movesmade,
                buttonsEnabled: true,
                positionScore: res.data.positionScore,
                game: new Game(res.data.movesmade),
                whoWon: new Game(res.data.movesmade).winner
            }))
            .catch((error) => {
                console.log(error);
            })  

            if(this.state.whoWon !== 0 ){ 
                const winner = this.state.whoWon < 2 ? "Black": "Blue";
                if(winner === this.state.whoWon) {
                    document.getElementById("gameStatus").innerHTML = "Victory!";
                }
                else {
                    document.getElementById("gameStatus").innerHTML = "Defeat!";
                }
                document.getElementById("gameStatus").style.opacity = 1;
                document.getElementById("gameStatus").style.animation = "example1 5s cubic-bezier(.4,0,.2,1) forwards";

            } 
            console.log(this.state.whoWon);
            console.log(this.state.game.board);            
            console.log(this.state.player);
        }
    }
    
    displayColumnHeader(img) {
        if (this.state.game.possibleMoves[img.target.className-1] < 6 && this.state.game.winner === 0){
            if(this.state.player === "Black"){
                document.getElementById(img.target.className).src = Black;
            }
            else if(this.state.player === "Blue"){
                document.getElementById(img.target.className).src = Blue;
            }
        }
    }

    hideHeader(img) {
           document.getElementById(img.target.className).src = WhiteBack;
    }

    displayTopRow() {
        let columnIndex = 0;
        return this.state.game.board[0].map(()=>{
            columnIndex ++;
            return <th> <img src = {WhiteBack} id = {columnIndex} /> </th>
        })
    }

    displayBoard(){
        return this.state.game.board.reverse().map((game) => {
            let columnIndex = 0;
            return <tr> {game.map((square)=>{
                columnIndex ++;
                if (square == 0) {
                    return <td> <img src = {WhiteC} className = {columnIndex} onMouseLeave = {this.hideHeader} onMouseOver = {this.displayColumnHeader} onClick={this.onSubmit}/> </td>
                }
                else if (square == 1) {
                    return <td> <img src = {BlackCircleGrayBack} className = {columnIndex} onMouseLeave = {this.hideHeader} onMouseOver = {this.displayColumnHeader} onClick={this.onSubmit}/> </td>
                }
                else if (square == 2) {
                    return <td> <img src = {BlueCircleGrayBack} className = {columnIndex} onMouseLeave = {this.hideHeader} onMouseOver = {this.displayColumnHeader} onClick={this.onSubmit}/> </td>
                }
            })} </tr>
        })
    }

    render() {
         return (
             <section>            
                <table class="board" border="0" cellpadding="0" cellSpacing="0">
                    <h2 id = "gameStatus"> </h2>
                    <tr>  
                        {this.displayTopRow()}
                    </tr>
                        {this.displayBoard()}
                </table>
            </section>  
        )
    }
}