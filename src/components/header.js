import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Newgame from './newgame';
import Statistics from './statistics';

export default class Headerbar extends Component {
  constructor(props) {
    
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      movesmade: '',
      refutation: '',
      whatever: 'Not it mane',
      player1:[0,0,0,0,0,0,0],
      player2:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
  }

  async onSubmit(e) {
    e.preventDefault();

    const game = {
      movesmade: this.state.movesmade,
      refutation: this.state.refutation,
      ongoing: "NEW GAME!"
    }

    console.log(game);

    await axios.post('http://localhost:5000/games/add', game)
      .then(res => console.log(res.data));

    await axios.get('http://localhost:5000/games/')
        .then(res => this.setState({whatever: res.data[res.data.length-1]._id}))
        .catch((error) => {
                  console.log(error);
              })
              .then(setTimeout(() => {
                console.log(this.state.whatever);
                window.location = "/games/" + this.state.whatever;
                    }, 500))
   
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        {/* <form onSubmit={this.onSubmit}>
        <input type="submit" value="New Game" className="navbar-brand" />
        </form> */}
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-brand">
          <Link to="" className="nav-link" component={Newgame}>New Game</Link>
          </li>
          <li className="navbar-brand">
          <Link to="/statistics" className="nav-link" component={Statistics} > Statistics </Link>
          </li>


          
          
          
        </ul>
        </div>
      </nav>
    );
  }
}