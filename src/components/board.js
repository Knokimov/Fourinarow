import React, { Component } from 'react';
import axios from 'axios';
import BlackC from "../BlackC.png";
import WhiteC from "../WhiteC.png";
import RedC from "../RedC.png";
import WhiteA from "../Arrow1.png";
import BlackA from "../Arrow2.png";
// import { response } from 'express';

export default class Board extends Component {
  constructor(props) {
    
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeResponse = this.onChangeResponse.bind(this);
    // this.onSubmit = this.onSubmit.bind(this); TRY
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);
    this.onSubmit3 = this.onSubmit3.bind(this);
    this.onSubmit4 = this.onSubmit4.bind(this);
    this.onSubmit5 = this.onSubmit5.bind(this);
    this.onSubmit6 = this.onSubmit6.bind(this);
    this.onSubmit7 = this.onSubmit7.bind(this);
    
    this.onSubmit8 = this.onSubmit8.bind(this);

    this.state = {
      movesmade: '',
      refutation: '',
      ongoing: '1',
      whatever: 'Not it mane',
      player1:[0,0,0,0,0,0,0],
      player2:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
  }

  async componentDidMount() {
    const url = 'http://localhost:5000/games/' + this.props.match.params.id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({movesmade: data.movesmade})


    // axios.get('http://localhost:5000/games/:id')
    //   .then(response => {
    //     this.setState({
    //       // movesmade: response.data.movesmade,
    //       // refutation: response.data.refutation,
    //       // ongoing: "WHatp"
    //       // whatever: "DAT IS IT PAPI" 
    //     })   
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
      // .then(document.getElementById('gameinfo').innerHTML = this.state.whatever)
    }




  onChangeInput(e) {
    this.setState({
      input: e.target.value
    })
  }

  onChangeResponse(e) {
    this.setState({
      response: e.target.value
    })
  }

addMovetoMovesmade(x) {
    this.setState({
        movesmade: this.state.movesmade + x
    })
}

  changeArrowBlack(e) {
    e.target.src = BlackA;
  }

  changeArrowWhite(e) {
      e.target.src = WhiteA;
  }

  async getData() {
    const url = 'http://localhost:5000/games/' + this.props.match.params.id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({movesmade: data.movesmade})
  }
  

    colorboard() {
        const columnF = [0,0,0,0,0,0,0];
        // document.getElementById('gameinfo').innerHTML = "Play on!";
 

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
          
        
        document.getElementById(`square${squarenumber}`).src = BlackC;
        document.getElementById('gameinfo').innerHTML = this.state.movesmade;
        // document.getElementById('gameinfo').innerHTML = "Invalid Move!";  
      }
    }
        // this.setState({column: columnF});
        
    } else {
      if (this.state.movesmade[i] == 0) {
        document.getElementById('gameinfo').innerHTML = "Red Wins";
        break;
      }  
      
      const columnSpace = columnF[this.state.movesmade[i]*1-1];
        const squarenumber = 34 + 1 * this.state.movesmade[i] - columnSpace * 7;
        
        if (columnF[this.state.movesmade[i]*1-1]+ 1> 6 ) {
          document.getElementById('gameinfo').innerHTML = "Invalid Move!";
          } else {
        columnF[this.state.movesmade[i]*1-1] +=1;
      
        if (squarenumber >= 0 && squarenumber < 42){
          
        document.getElementById(`square${squarenumber}`).src = RedC;}
        document.getElementById('gameinfo').innerHTML = this.state.movesmade;
        // this.setState({column: columnF});
        }}
    }
    
  }
    
  // onSubmit(e) {
  //   e.preventDefault();

  //   this.addMovetoMovesmade(1);
  //   this.colorboard();

  //   const solver = {
  //     movesmade: this.state.movesmade + 1,
  //     refutation: this.state.refutation,
  //   }

  //   axios.post('http://localhost:5000/moves/add', solver)
  //     .then(res => console.log(res.data));

  //     axios.get('http://localhost:5000/moves')
  //     .then(res => this.setState({refutation: res.data[res.data.length-1].refutation}))
  //     .catch((error) => {
  //         console.log(error);
  //     })
  //     .then(setTimeout(() => {
  //       this.colorboard();
  //     }, 500))
  // }


  // onSubmit(e) {
  //   e.preventDefault();

  //   const game = {
  //     movesmade: this.state.movesmade,
  //     refutation: this.state.refutation,
  //     ongoing: "NEW GAME!"
  //   }

  //   console.log(game);

  //   axios.post('http://localhost:5000/games/add', game)
  //     .then(res => console.log(res.data));

  //   // window.location = "/statistics";
  //   // this.props.match.params.id
  // }

  // onSubmit(e) {
  //   e.preventDefault();

  //   this.setState({movesmade: this.state.movesmade + "1"})

  //   const game = {
  //     movesmade: this.state.movesmade + "1",
  //     refutation: this.state.refutation,
  //   }

  //   axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
  //     .then(res => console.log(res.data))
  //     this.getData();
  //     this.colorboard();
  // }

  async onSubmit1(e) {
    e.preventDefault();

    this.setState({movesmade: this.state.movesmade + "1"})

    const game = {
      movesmade: this.state.movesmade + "1",
      refutation: this.state.refutation,
    }

     await axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data))
            
      await axios.get('http://localhost:5000/games/' + this.props.match.params.id)
      .then(res => this.setState({movesmade: res.data.movesmade}))
          .catch((error) => {
              console.log(error);
          })
          .then(setTimeout(() => {
            this.colorboard();
          }, 500))
          this.colorboard();
  }

  async onSubmit2(e) {
    e.preventDefault();

    this.setState({movesmade: this.state.movesmade + "2"})

    const game = {
      movesmade: this.state.movesmade + "2",
      refutation: this.state.refutation,
    }

     await axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data))
            
      await axios.get('http://localhost:5000/games/' + this.props.match.params.id)
      .then(res => this.setState({movesmade: res.data.movesmade}))
          .catch((error) => {
              console.log(error);
          })
          .then(setTimeout(() => {
            this.colorboard();
          }, 500))
          this.colorboard();
  }

  async onSubmit3(e) {
    e.preventDefault();

    this.setState({movesmade: this.state.movesmade + "3"})

    const game = {
      movesmade: this.state.movesmade + "3",
      refutation: this.state.refutation,
    }

     await axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data))
            
      await axios.get('http://localhost:5000/games/' + this.props.match.params.id)
      .then(res => this.setState({movesmade: res.data.movesmade}))
          .catch((error) => {
              console.log(error);
          })
          .then(setTimeout(() => {
            this.colorboard();
          }, 500))
          this.colorboard();
  }

  async onSubmit4(e) {
    e.preventDefault();

    this.setState({movesmade: this.state.movesmade + "4"})

    const game = {
      movesmade: this.state.movesmade + "4",
      refutation: this.state.refutation,
    }

   await axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data))
            
      await axios.get('http://localhost:5000/games/' + this.props.match.params.id)
      .then(res => this.setState({movesmade: res.data.movesmade}))
          .catch((error) => {
              console.log(error);
          })
          .then(setTimeout(() => {
            this.colorboard();
          }, 500))
          this.colorboard();
  }

  async onSubmit5(e) {
    e.preventDefault();

    this.setState({movesmade: this.state.movesmade + "5"})

    const game = {
      movesmade: this.state.movesmade + "5",
      refutation: this.state.refutation,
    }

     await axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data))
            
      await axios.get('http://localhost:5000/games/' + this.props.match.params.id)
      .then(res => this.setState({movesmade: res.data.movesmade}))
          .catch((error) => {
              console.log(error);
          })
          .then(setTimeout(() => {
            this.colorboard();
          }, 500))
          this.colorboard();
  }

  async onSubmit6(e) {
    e.preventDefault();

    this.setState({movesmade: this.state.movesmade + "6"})

    const game = {
      movesmade: this.state.movesmade + "6",
      refutation: this.state.refutation,
    }

     await axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data))
            
      await axios.get('http://localhost:5000/games/' + this.props.match.params.id)
      .then(res => this.setState({movesmade: res.data.movesmade}))
          .catch((error) => {
              console.log(error);
          })
          .then(setTimeout(() => {
            this.colorboard();
          }, 500))
          this.colorboard();
  }

  async onSubmit7(e) {
    e.preventDefault();

    this.setState({movesmade: this.state.movesmade + "7"})

    const game = {
      movesmade: this.state.movesmade + "7",
      refutation: this.state.refutation,
    }

    await axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data))
            
      await axios.get('http://localhost:5000/games/' + this.props.match.params.id)
      .then(res => this.setState({movesmade: res.data.movesmade}))
          .catch((error) => {
              console.log(error);
          })
          .then(setTimeout(() => {
            this.colorboard();
          }, 500))
          this.colorboard();
      


      // .then(this.getData())
      // .then(setTimeout(() => {
      //         this.colorboard();
      //       }, 2000))
      //       this.colorboard();
  }

  async onSubmit8(e) {
    e.preventDefault();

    this.setState({movesmade: this.state.movesmade + e.target.id})

    const game = {
      movesmade: this.state.movesmade + e.target.id,
      refutation: this.state.refutation,
    }

    console.log(this.props.match.id)
    console.log(e.target.id)

    await axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data))
            
      await axios.get('http://localhost:5000/games/' + this.props.match.params.id)
      .then(res => this.setState({movesmade: res.data.movesmade}))
          .catch((error) => {
              console.log(error);
          })
          .then(setTimeout(() => {
            this.colorboard();
          }, 500))
          this.colorboard();
      


      // .then(this.getData())
      // .then(setTimeout(() => {
      //         this.colorboard();
      //       }, 2000))
      //       this.colorboard();
  }

   // onSubmit1(e) {
  //   e.preventDefault();

  //   this.addMovetoMovesmade(1);
  //   this.colorboard();

  //   const solver = {
  //     movesmade: this.state.movesmade + 1,
  //     refutation: this.state.refutation,
  //   }

  //   axios.post('http://localhost:5000/moves/add', solver)
  //     .then(res => console.log(res.data));

  //     axios.get('http://localhost:5000/moves')
  //     .then(res => this.setState({movesmade: res.data[res.data.length-1].movesmade}))
  //     .catch((error) => {
  //         console.log(error);
  //     })
  //     .then(setTimeout(() => {
  //       this.colorboard();
  //     }, 500))
  //     this.colorboard();
  // }

  // onSubmit2(e) {
  //   e.preventDefault();

  //   this.addMovetoMovesmade(1);
  //   this.colorboard();

  //   const solver = {
  //     movesmade: this.state.movesmade + 1,
  //     refutation: this.state.refutation,
  //   }

  //   axios.post('http://localhost:5000/moves/add', solver)
  //     .then(res => console.log(res.data));

  //     axios.get('http://localhost:5000/moves')
  //     .then(res => this.setState({movesmade: res.data[res.data.length-1].movesmade}))
  //     .catch((error) => {
  //         console.log(error);
  //     })
  //     .then(setTimeout(() => {
  //       this.colorboard();
  //     }, 500))
  //     this.colorboard();
  // }


 

  // onSubmit3(e) {
  //   e.preventDefault();

  //   this.addMovetoMovesmade(3);
  //   this.colorboard();

  //   const solver = {
  //     movesmade: this.state.movesmade + 3,
  //     refutation: this.state.refutation,
  //   }

  //   axios.post('http://localhost:5000/moves/add', solver)
  //     .then(res => console.log(res.data));

  //     axios.get('http://localhost:5000/moves')
  //     .then(res => this.setState({movesmade: res.data[res.data.length-1].movesmade}))
  //     .catch((error) => {
  //         console.log(error);
  //     })
  //     .then(setTimeout(() => {
  //       this.colorboard();
  //     }, 500))
  //     this.colorboard();
  // }

  // onSubmit4(e) {
  //   e.preventDefault();

  //   this.addMovetoMovesmade(4);
  //   this.colorboard();

  //   const solver = {
  //     movesmade: this.state.movesmade + 4,
  //     refutation: this.state.refutation,
  //   }

  //   axios.post('http://localhost:5000/moves/add', solver)
  //     .then(res => console.log(res.data));

  //     axios.get('http://localhost:5000/moves')
  //     .then(res => this.setState({movesmade: res.data[res.data.length-1].movesmade}))
  //     .catch((error) => {
  //         console.log(error);
  //     })
  //     .then(setTimeout(() => {
  //       this.colorboard();
  //     }, 500))
  //     this.colorboard();
  // }

  // onSubmit5(e) {
  //   e.preventDefault();

  //   this.addMovetoMovesmade(5);
  //   this.colorboard();

  //   const solver = {
  //     movesmade: this.state.movesmade + 5,
  //     refutation: this.state.refutation,
  //   }

  //   axios.post('http://localhost:5000/moves/add', solver)
  //     .then(res => console.log(res.data));

  //     axios.get('http://localhost:5000/moves')
  //     .then(res => this.setState({movesmade: res.data[res.data.length-1].movesmade}))
  //     .catch((error) => {
  //         console.log(error);
  //     })
  //     .then(setTimeout(() => {
  //       this.colorboard();
  //     }, 500))
      
      
  //   //   console.log("Das it mane");
      
  //   //   setTimeout(() => {
  //   //     this.colorboard();
  //   //   }, 2000);
      
  // }

  // onSubmit6(e) {
  //   // e.preventDefault();

  //   this.addMovetoMovesmade(6);
  //   e.preventDefault();
    
  //   this.addMovetoMovesmade(6);
  //   this.colorboard();

  //   const solver = {
  //     movesmade: this.state.movesmade + 6,
  //     refutation: this.state.refutation,
  //   }

  //   axios.post('http://localhost:5000/moves/add', solver)
  //     .then(res => console.log(res.data));

  //     axios.get('http://localhost:5000/moves')
  //     .then(res => this.setState({movesmade: res.data[res.data.length-1].movesmade}))
  //     .catch((error) => {
  //         console.log(error);
  //     })
  //     .then(setTimeout(() => {
  //       this.colorboard();
  //     }, 500))
  //     this.colorboard();
  // }

  // onSubmit7(e) {
  //   this.colorboard();
  //   e.preventDefault();

  //   this.addMovetoMovesmade(7);
  //   this.colorboard();

  //   const solver = {
  //     movesmade: this.state.movesmade + 7,
  //     refutation: this.state.refutation,
  //   }

  //   axios.post('http://localhost:5000/moves/add', solver)
  //     .then(res => console.log(res.data));

  //     axios.get('http://localhost:5000/moves')
  //     .then(res => this.setState({movesmade: res.data[res.data.length-1].movesmade}))
  //     .catch((error) => {
  //         console.log(error);
  //     })
  //     .then(setTimeout(() => {
  //       this.colorboard();
  //     }, 500))
  //   //   this.colorboard();
  // }

  
  render() {
    return (
    <div>
<h3 id = "gameinfo"> </h3>
<table classname = "table"> 
<thead className ="arrow"> 
<div class = "arrow">
<tr> <th>
<form onSubmit={this.onSubmit8} id="1">
<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>
</form></th><th>
<form onSubmit={this.onSubmit8} id="2">
<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>
</form></th><th>
<form onSubmit={this.onSubmit8} id="3">
<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>
</form></th><th>
<form onSubmit={this.onSubmit8} id="4">
<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>
</form></th><th>
<form onSubmit={this.onSubmit8} id="5">
<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>
</form></th><th>
<form onSubmit={this.onSubmit8} id="6">
<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>
</form></th><th>
<form onSubmit={this.onSubmit8} id="7" >
<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>
</form></th>
</tr>


{/* <form onSubmit={this.onSubmit3}>







<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>

<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>

<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>

<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>

<input type="image" src={WhiteA} alt="Submit" onMouseOver={this.changeArrowBlack} onMouseLeave={this.changeArrowWhite}/>
</form> */}

</div>
</thead>

<tbody>
<div class = "row1">
<img src = {WhiteC} class = "column1" alt= "circle" id= "square0"/>
<img src = {WhiteC} class = "column2" alt= "circle" id= "square1"/>
<img src = {WhiteC} class = "column3" alt= "circle" id= "square2"/>
<img src = {WhiteC} class = "column4" alt= "circle" id= "square3"/>
<img src = {WhiteC} class = "column5" alt= "circle" id= "square4"/>
<img src = {WhiteC} class = "column6" alt= "circle" id= "square5"/>
<img src = {WhiteC} class = "column7" alt= "circle" id= "square6"/>
</div>

<div class = "row2">
<img src = {WhiteC} class = "column1" alt= "circle" id= "square7"/>
<img src = {WhiteC} class = "column2" alt= "circle" id= "square8"/>
<img src = {WhiteC} class = "column3" alt= "circle" id= "square9"/>
<img src = {WhiteC} class = "column4" alt= "circle" id= "square10"/>
<img src = {WhiteC} class = "column5" alt= "circle" id= "square11"/>
<img src = {WhiteC} class = "column6" alt= "circle" id= "square12"/>
<img src = {WhiteC} class = "column7" alt= "circle" id= "square13"/>
</div>

<div class = "row3">
<img src = {WhiteC} class = "column1" alt= "circle" id= "square14"/>
<img src = {WhiteC} class = "column2" alt= "circle" id= "square15"/>
<img src = {WhiteC} class = "column3" alt= "circle" id= "square16"/>
<img src = {WhiteC} class = "column4" alt= "circle" id= "square17"/>
<img src = {WhiteC} class = "column5" alt= "circle" id= "square18"/>
<img src = {WhiteC} class = "column6" alt= "circle" id= "square19"/>
<img src = {WhiteC} class = "column7" alt= "circle" id= "square20"/>
</div>

<div class = "row4">
<img src = {WhiteC} class = "column1" alt= "circle" id= "square21"/>
<img src = {WhiteC} class = "column2" alt= "circle" id= "square22"/>
<img src = {WhiteC} class = "column3" alt= "circle" id= "square23"/>
<img src = {WhiteC} class = "column4" alt= "circle" id= "square24"/>
<img src = {WhiteC} class = "column5" alt= "circle" id= "square25"/>
<img src = {WhiteC} class = "column6" alt= "circle" id= "square26"/>
<img src = {WhiteC} class = "column7" alt= "circle" id= "square27"/>
</div>

<div class = "row5">
<img src = {WhiteC} class = "column1" alt= "circle" id= "square28"/>
<img src = {WhiteC} class = "column2" alt= "circle" id= "square29"/>
<img src = {WhiteC} class = "column3" alt= "circle" id= "square30"/>
<img src = {WhiteC} class = "column4" alt= "circle" id= "square31"/>
<img src = {WhiteC} class = "column5" alt= "circle" id= "square32"/>
<img src = {WhiteC} class = "column6" alt= "circle" id= "square33"/>
<img src = {WhiteC} class = "column7" alt= "circle" id= "square34"/>
</div>

<div class = "row6">
<img src = {WhiteC} class = "column1" alt= "circle" id= "square35"/>
<img src = {WhiteC} class = "column2" alt= "circle" id= "square36"/>
<img src = {WhiteC} class = "column3" alt= "circle" id= "square37"/>
<img src = {WhiteC} class = "column4" alt= "circle" id= "square38"/>
<img src = {WhiteC} class = "column5" alt= "circle" id= "square39"/>
<img src = {WhiteC} class = "column6" alt= "circle" id= "square40"/>
<img src = {WhiteC} class = "column7" alt= "circle" id= "square41"/>
</div>
</tbody>
</table>
</div>


    )
  }
}