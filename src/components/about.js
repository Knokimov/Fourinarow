import React, { Component } from 'react';
import BlackCircleGrayBack from "../BlackCircleGrayBack.jpg";
import WhiteC from "../WhiteCircleGreyBack.jpg";
import BlueCircleGrayBack from "../BlueCircleGrayBack.jpg"; 
import WhiteBack from "../WhiteBack.jpg";
import Blue from "../BlueCircleWhiteBack.jpg"; 
import Black from "../BlackCircleWhiteBack.jpg"; 
import Game from "./game";
import Container from 'react-bootstrap/Container';
import './about.css';

export default class About extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            player: Math.random()*10,
            movesmade: "",
            game: this.game,
        }
    }

    onSubmit(img) {
        img.target.style.animation = "example1 5s cubic-bezier(.4,0,.2,1) forwards";
        document.getElementById("test").innerHTML = "DAS IT MANE";
        
    }

    render() {
         return (
            <div class="example1">
            <h3>Invalid move</h3>
            <h2 id = "test" onClick = {this.onSubmit}> TEST </h2>
          </div>
        )
    }
}