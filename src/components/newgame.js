import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-awesome-modal';
import BlackC from "../BlackCircleWhiteBack.jpg";
import BlueC from "../BlueCircleWhiteBack.jpg";
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import "./newGame.css";

export default class Newgame extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            visible : false,
            gameID: '',
            loading: false, 
            color: ""
        }
    }

    opasityIncrease(e) {
        const list = document.getElementsByClassName(e.target.className);
        list[0].style.opacity = 1;
        list[1].style.opacity = 1;
    }
    
    opasityDecrease(e) {
        const list = document.getElementsByClassName(e.target.className);
        list[0].style.opacity = 0.5;
        list[1].style.opacity = 0.5;
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    async onSubmit(e) {
        e.preventDefault();
        const target = document.getElementById(e.target.id);
        document.getElementById("Blue").style.display = "none";
        document.getElementById("Black").style.display = "none";
        document.getElementById("BlueText").style.display = "none";
        document.getElementById("BlackText").style.display = "none";
        document.getElementById("close").style.display = "none";
        document.getElementById("colorChoiceText").innerHTML = "Loading...";

        this.setState({loading: true,
            color: target.id.toLowerCase() == "black" ? "#353a40": "#168bff"});

        const game = {
            movesmade: '',
            refutation: '',
            ongoing: "NEW GAME!"
        }
    
        await axios.post(`http://localhost:5000/games/add${target.id}`, game)
            .then(res => console.log(res.data));        
        await axios.get('http://localhost:5000/games/')
            .then(res => this.setState({gameID: res.data[res.data.length-1]._id}))
            .catch((error) => {
                console.log(error);
                    })
            window.location = "/games/" + this.state.gameID;
        }
    
    render() {
        return (
            <section>
                <Link className="nav-link" onClick={() => this.openModal()}> New game </Link>
                <Modal visible={this.state.visible} width="400" height="350" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <h1 id = "colorChoiceText">Choose Your Color</h1>
                        <ClipLoader
                            css={`display: block; margin: 40px auto; border: 10px solid ${this.state.color}; border-bottom-color: transparent;`}
                            size={150}
                            loading={this.state.loading}
                        />

                    <div class="row">
                        <div class="column">
                            <img src = {BlackC} className = "Black" alt= "1" id= "Black" onClick={this.onSubmit} onMouseOver={this.opasityIncrease} onMouseLeave={this.opasityDecrease} />
                                <h3 class="moveOrder" className = "Black" id="BlackText" onMouseOver={this.opasityIncrease} onMouseLeave={this.opasityDecrease}> Move first</h3>
                            </div>
                        <div class="column">
                            <img src = {BlueC} className = "Blue" alt= "2" id= "Blue" onClick={this.onSubmit} onMouseOver={this.opasityIncrease} onMouseLeave={this.opasityDecrease}/>
                            <h3 class="moveOrder" className = "Blue" id="BlueText" onMouseOver={this.opasityIncrease} onMouseLeave={this.opasityDecrease}> Move second</h3>
                                </div>
                        </div>
                        <div className="sweet-loading"> </div>
                        <footer>
                            <a href="javascript:void(0);" id = "close" onClick={() => this.closeModal()}>Close</a>
                        </footer>
                </Modal>
            </section>
        );
    }
}