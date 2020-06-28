import React, { Component } from 'react';
import axios from 'axios';

export default class Solverlist extends Component {
    constructor(props) {
      super(props);
  
      this.onChangeInput = this.onChangeInput.bind(this);
      this.onChangeResponse = this.onChangeResponse.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        movesmade: "12141377",
        refutation: '',
        whatever: 'Das it mane'
      }
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
  
  
    onSubmit(e) {
      e.preventDefault();
    
      this.setState({
          movesmade: this.state.movesmade + "7"
      })

      const solver = {
        movesmade: this.state.movesmade + "7",
        refutation: this.state.refutation,
      }
  
      axios.post('http://localhost:5000/moves/add', solver)
        .then(res => console.log(res.data));

        axios.get('http://localhost:5000/moves')
        .then(res => this.setState({refutation: res.data[res.data.length-1].refutation}))
        .catch((error) => {
            console.log(error);
        })
    //   window.location = '/';
    }
  
  
    render() {
      return (
      <div>
          <p>Where is it + {this.state.refutation}</p>
          <p>{this.state.movesmade} </p>
      <tr> 
          <th>
              <form onSubmit={this.onSubmit}>
                  <div className="arrows">
                  <input type="submit" value="1" className="btn btn-primary" />
                  </div>
              </form>
        </th>
  
      </tr>
      </div> 
      )}};