import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Headerbar extends Component {
  constructor(props) {
    
    super(props);

    // this.onChangeInput = this.onChangeInput.bind(this);
    // this.onChangeResponse = this.onChangeResponse.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      movesmade: '',
      refutation: '',
      whatever: 'Not it mane',
      player1:[0,0,0,0,0,0,0],
      player2:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const game = {
      movesmade: this.state.movesmade,
      refutation: this.state.refutation,
      ongoing: "NEW GAME!"
    }

    console.log(game);

    axios.post('http://localhost:5000/games/add', game)
      .then(res => console.log(res.data));

    axios.get('http://localhost:5000/games/')
        .then(res => this.setState({whatever: res.data[res.data.length-1]._id}))
        .catch((error) => {
                  console.log(error);
              })
              .then(setTimeout(() => {
                console.log(this.state.whatever);
                window.location = "/games/" + this.state.whatever;
                    }, 500))
   
    
    // console.log(this.props.match.params.id)
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <form onSubmit={this.onSubmit}>
        {/* <Link to="/newgame" className="navbar-brand" value ="New Game" type="submit">New Game</Link> */}
        <input type="submit" value="New Game" className="navbar-brand" />
        </form>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/Statistics" className="navbar-brand">Statistics</Link>
          {/* <Link to="/" className="nav-link">Statistics</Link> */}
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}