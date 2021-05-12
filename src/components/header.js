import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Newgame from './newGame';
import './header.css';

export default class Headerbar extends Component {
  constructor(props) {
    super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-brand">
                            <Link to="" className="nav-link" id= "new" component={Newgame}>New Game</Link>
                        </li>
                        <li className="navbar-brand">
                            <Link to="/statistics" className="nav-link"> Statistics</Link>
                        </li>
                        <li className="navbar-brand">
                            <Link to="/about" className="nav-link"> About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}