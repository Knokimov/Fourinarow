import React, { Component } from 'react';
import "./recentGames.css";

export default class RecentGames extends Component {
    constructor(props) {
        super(props);
        this.goToGame = this.goToGame.bind(this);
        this.state = {
            gameData: [{movesmade: ""}]
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:5000/games/';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            gameData: data
        });
    }

    goToGame(link) {
        const game = link.target.textContent;
        window.location = `/games/${game}`;
    }

    playersResult(gameResult, player){
        if (gameResult == 1 && player == "Black") {
            return "Victory";
        }
        else if (gameResult == 2 && player == "Blue") {
            return "Victory";
        }        
        else {
            return "Defeat"
        }
    }

    displayRecentGames(){
        return this.state.gameData.slice(-10).reverse().map((game)=>{
            return <tr class="tabledata">
                    <td>{game.movesmade.length}</td> 
                    <td>{game.ai}</td>
                    <td>{game.player} </td>
                    <td class="ID" onClick = {this.goToGame}>{game._id} </td>
                    <td>{game.updatedAt} </td>
                    <td>{this.playersResult(game.whoWon, game.player)} </td>
                </tr>
        })
    }

    render() {
         return (
            <section>
                <h1>Recent games</h1>
                <table class = "RecentGames">
                    <tr>
                        <th>Number of moves</th>
                        <th>Ai</th>
                        <th>Player</th>
                        <th>GameID</th>
                        <th>Time Finished</th>
                        <th>Players Result</th>
                    </tr>
                    {this.displayRecentGames()}
                </table>                
            </section>
        )
    }
}