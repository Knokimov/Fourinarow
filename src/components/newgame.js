    import React, { Component } from 'react';
    import axios from 'axios';
    import "./newgame.css";
    import Modal from 'react-awesome-modal';
    import BlackC from "../BlackCircleWhiteBack.jpg";
    import WhiteC from "../WhiteC.png";
    import RedC from "../BlueCircleWhiteBack.jpg";
    import WhiteA from "../Arrow1.png";
    import BlackA from "../Arrow2.png";
    import { Link } from 'react-router-dom';
    import ClipLoader from "react-spinners/ClipLoader";
    
    const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;

    export default class Newgame extends Component {
        constructor(props) {
            super(props);
            this.onSubmitBlack = this.onSubmitBlack.bind(this);
            this.onSubmitBlue = this.onSubmitBlue.bind(this);

            this.state = {
                visible : false,
                gameID: '',
                loading: false
            }
        }


        opasityIncrease(e) {
            const target = document.getElementById(e.target.id)
            target.style.opacity = 1;
            
        }

        opasityDecrease(e) {
            const target = document.getElementById(e.target.id)
            target.style.opacity = 0.5;
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

        async onSubmitBlack(e) {
            e.preventDefault();
        
            const game = {
              movesmade: '',
              refutation: '',
              ongoing: "NEW GAME!"
            }
        
            console.log(game);
        
            await axios.post('http://localhost:5000/games/addBlack', game)
              .then(res => console.log(res.data));
        
            await axios.get('http://localhost:5000/games/')
                .then(res => this.setState({gameID: res.data[res.data.length-1]._id}))
                .catch((error) => {
                          console.log(error);
                      })
                    //   .then(setTimeout(() => {
                    //     console.log(this.state.gameID);
                    //     window.location = "/games/" + this.state.gameID;
                    //         }, 500))

            window.location = "/games/" + this.state.gameID;
           
          }

          async onSubmitBlue(e) {
            e.preventDefault();

            const target = document.getElementById(e.target.id)
            target.style.opacity = 0;


            this.setState({loading: true});

            const game = {
              movesmade: '',
              refutation: '',
              ongoing: "NEW GAME!"
            }
        
            console.log(game);
        
            await axios.post('http://localhost:5000/games/addBlue', game)
              .then(res => console.log(res.data));
        
            await axios.get('http://localhost:5000/games/')
                .then(res => this.setState({gameID: res.data[res.data.length-1]._id}))
                // .then(window.location = "/games/" + this.state.gameID)
                .catch((error) => {
                          console.log(error);
                      })
                    //   .then(setTimeout(() => {
                    //     console.log(this.state.gameID);
                    //     window.location = "/games/" + this.state.gameID;
                    //         }, 500))
            window.location = "/games/" + this.state.gameID;
           
          }
    
        render() {
            return (
                <section>
                    {/* <h1>React-Modal Examples</h1> */}
                    {/* <input type="button" className="navbar-brand" value="New Game" onClick={() => this.openModal()} /> */}
                    <Link to="" className="nav-link" onClick={() => this.openModal()}> New game</Link>
                    <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div>
                            <h1>Choose Your Color</h1>
                            <ClipLoader
                            css={override}
                            size={150}
                            color={"#123abc"}
                            loading={this.state.loading}
                            />
                            <img src = {BlackC} class = "column6" alt= "1" id= "Black" onClick={this.onSubmitBlack} onMouseOver={this.opasityIncrease} onMouseLeave={this.opasityDecrease} />
                            <img src = {RedC} class = "column7" alt= "2" id= "Blue" onClick={this.onSubmitBlue} onMouseOver={this.opasityIncrease} onMouseLeave={this.opasityDecrease}/>
                            <div className="sweet-loading">
                            
                        </div>
                            <footer>
                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                            </footer>
                            
                        </div>
                    </Modal>
                </section>
            );
        }
    }