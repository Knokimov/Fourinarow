import React, { Component } from 'react';
import './about.css';

export default class About extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            movesmade: "",
            game: this.game,
        }
    }

    onSubmit(img) {
        img.target.style.animation = "example1 5s cubic-bezier(.4,0,.2,1) forwards";
        
    }

    render() {
         return (
            <div class="example1">
            <h3>Under construction</h3>
          </div>
        )
    }
}